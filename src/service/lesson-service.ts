import { Request } from "express";
import { Validation } from "../validation/validation";
import { LessonValidation } from "../validation/lesson-validation";
import prisma from "../lib/prisma";

export default class LessonService {
  static async createLesson(req: Request) {
    const request = req.body;
    const lessonRequest = Validation.validate(LessonValidation.CREATE, request);
    const lesson = await prisma.lesson.create({
      data: {
        name: String(lessonRequest?.name),
        video: String(lessonRequest?.video),
        chapter_id: parseInt(lessonRequest?.chapter_id),
      },
    });
    return lesson;
  }

  static async getAllLesson() {
    const lesson = await prisma.lesson.findMany();
    return lesson;
  }

  static async updateLesson(id: number, req: Request) {
    const request = req.body;
    const lessonRequest = Validation.validate(LessonValidation.UPDATE, request);
    const lesson = await prisma.lesson.update({
      where: {
        id: id,
      },
      data: {
        name: String(lessonRequest?.name),
        video: String(lessonRequest?.video),
        chapter_id: parseInt(lessonRequest?.chapter_id),
      },
    });
    return lesson;
  }

  static async deleteLesson(id: number) {
    const lesson = await prisma.lesson.delete({
      where: {
        id: id,
      },
    });
    return lesson;
  }
}
