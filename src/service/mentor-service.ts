import { Request } from "express";
import { ResponseError } from "../error/response-error";
import cloudinary from "../lib/cloudinary";
import prisma from "../lib/prisma";
import {
  MentorRequest,
  MentorResponse,
  ToMentorResponse,
} from "../model/mentor-model";
import { MentorValidation } from "../validation/mentor-validation";
import { Validation } from "../validation/validation";

export default class MentorService {
  static async createMentor(req: Request): Promise<MentorResponse> {
    const request = req.body as MentorRequest;
    const mentorRequest = Validation.validate(MentorValidation.CREATE, request);

    const check = await prisma.mentor.findUnique({
      where: { email: mentorRequest.email },
    });

    if (check) throw new ResponseError(400, "Email already exist");

    if (!req.file) {
      throw new Error("No file attached to the request");
    }

    const uploadAvatar = await cloudinary.v2.uploader.upload(req.file?.path, {
      folder: "bwaMicroExpress/mentor",
    });

    const mentor = await prisma.mentor.create({
      data: {
        ...mentorRequest,
        avatar: uploadAvatar.secure_url,
        public_id: uploadAvatar.public_id,
      },
    });

    return ToMentorResponse(mentor);
  }

  static async getAllMentor(): Promise<MentorResponse[]> {
    const mentor = await prisma.mentor.findMany();
    return mentor.map(ToMentorResponse);
  }

  static async updateMentor(id: number, req: Request): Promise<MentorResponse> {
    const request = req.body as MentorRequest;
    const mentorRequest = Validation.validate(MentorValidation.UPDATE, request);

    const check = await prisma.mentor.findFirst({
      where: { email: mentorRequest.email, id: { not: id } },
    });

    if (check) throw new ResponseError(400, "Email already exist");

    const checkImage = await prisma.mentor.findUnique({ where: { id: id } });

    if (!checkImage?.public_id)
      throw new ResponseError(404, "Mentor Image not found");

    await cloudinary.v2.uploader.destroy(checkImage?.public_id);

    if (!req.file) {
      throw new Error("No file attached to the request");
    }

    const uploadAvatar = await cloudinary.v2.uploader.upload(req.file?.path, {
      folder: "bwaMicroExpress",
    });

    const mentor = await prisma.mentor.update({
      where: { id: id },
      data: {
        ...mentorRequest,
        avatar: uploadAvatar.secure_url,
        public_id: uploadAvatar.public_id,
      },
    });

    return ToMentorResponse(mentor);
  }

  static async deleteMentor(id: number): Promise<MentorResponse> {
    const mentor = await prisma.mentor.delete({ where: { id: id } });

    if (!mentor) throw new ResponseError(404, "Mentor not found");

    if (!mentor?.public_id)
      throw new ResponseError(404, "Mentor Image not found");

    await cloudinary.v2.uploader.destroy(mentor.public_id);

    return ToMentorResponse(mentor);
  }
}
