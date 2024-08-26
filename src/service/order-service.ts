import { Request } from "express";
import { jwtDecode } from "jwt-decode";
import Midtrans from "midtrans-client";
import prisma from "../lib/prisma";
import { v4 as uuidv4 } from "uuid";
import { ResponseError } from "../error/response-error";

interface JwtPayload {
  name: string;
  userId: number;
  email: string;
  role?: string;
}

let snap = new Midtrans.Snap({
  isProduction: false,
  serverKey: String(process.env.server_key),
  clientKey: String(process.env.client_key),
});
export default class OrderService {
  static async createOrder(req: Request) {
    const token = req.headers?.authorization?.split(" ")[1];
    const decoded = jwtDecode<JwtPayload>(token!);
    const { order_item, price } = req.body;
    const { name, userId, email } = decoded;

    const order = await prisma.order.create({
      data: {
        order_item,
        price,
        gross_amount: price,
        order_id: uuidv4(),
        user_id: userId,
        email,
        name,
      },
    });

    const transactionDetails = {
      transaction_details: {
        order_id: String(order.order_id),
        gross_amount: Number(order.gross_amount),
      },
      customer_details: {
        first_name: String(order.name),
        email: String(order.email),
      },
    };
    const transactionToken = await snap.createTransaction(transactionDetails);

    const transaction = await prisma.transaction.create({
      data: {
        order_id_midtrans: transactionDetails.transaction_details.order_id, // Simpan order_id Midtrans
        gross_amount: transactionDetails.transaction_details.gross_amount,
      },
    });

    return {
      transactionToken,
      order,
      transaction,
    };
  }

  static async webhookMidtrans(req: Request) {
    const body = req.body;

    // Temukan transaksi berdasarkan order_id dari webhook
    const transaction = await prisma.transaction.findFirst({
      where: { order_id_midtrans: body.order_id },
    });

    if (!transaction) {
      throw new ResponseError(
        404,
        `Transaksi tidak ditemukan dengan order_id: :  ${body.order_id}`
      );
    }

    // Perbarui status transaksi sesuai dengan yang diterima dari webhook
    transaction.transaction_status = body.transaction_status;
    transaction.transaction_id = body.transaction_id;
    transaction.fraud_status = body.fraud_status;
    transaction.payment_type = body.payment_type;
    transaction.status_code = body.status_code;
    transaction.transaction_time = body.transaction_time;

    // Temukan pesanan berdasarkan order_id yang terkait dengan transaksi
    const order = await prisma.order.findFirst({
      where: { order_id: transaction.order_id_midtrans },
    });

    if (!order) {
      throw new ResponseError(
        404,
        `Pesanan tidak ditemukan dengan order_id :  ${transaction.order_id_midtrans}`
      );
    }

    // Perbarui status pesanan sesuai dengan status transaksi yang diterima dari webhook
    order.status = body.transaction_status;

    // Jika status transaksi adalah 'settlement', tambahkan kelas_id ke fitur "my course" (jika belum ada)
    if (body.transaction_status === "settlement") {
      // Dapatkan user_id dari data order
      const { user_id } = order;

      // Cari dokumen my_course untuk user_id yang sama
      let myCourse = await prisma.myCourse.findFirst({
        where: { user_id },
      });

      // Jika dokumen my_course belum ada, buat dokumen baru dengan user_id dan kelas_id
      myCourse = await prisma.myCourse.create({
        data: {
          user_id,
          course_id: order.order_item!,
        },
      });
    } else if (
      body.transaction_status === "expired" ||
      body.transaction_status === "failure"
    ) {
      // delete data dari table transaction
      await prisma.transaction.deleteMany({
        where: { order_id_midtrans: body.order_id },
      });
    }
  }

  static async checkMyCourse(classId: number, req: Request) {
    const token = req.headers?.authorization?.split(" ")[1];
    const decoded = jwtDecode<JwtPayload>(token!);
    const { userId } = decoded;

    const myCourse = await prisma.myCourse.findMany({
      where: {
        user_id: userId,
        course_id: classId,
      },
    });

    if (myCourse.length > 0) {
      let isBought = true;
      return {
        isBought,
      };
    } else {
      let isBought = false;
      return {
        isBought,
      };
    }
  }
}
