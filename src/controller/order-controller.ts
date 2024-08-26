import { NextFunction, Request, Response } from "express";
import OrderService from "../service/order-service";
export class OrderController {
  static async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await OrderService.createOrder(req);
      res.status(201).json({
        data: response.order,
        token: response.transactionToken.token,
        url: response.transactionToken.redirect_url,
      });
    } catch (error) {
      next(error);
    }
  }

  static async webhook(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await OrderService.webhookMidtrans(req);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async checkCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await OrderService.checkMyCourse(id, req);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
