import prisma from "../lib/prisma";
import { ChapterValidation } from "../validation/chapter-validation";
import { Validation } from "../validation/validation";
import { Request } from "express";

export default class ChapterService {
  static async createChapter(req: Request) {
    const request = req.body;
    const chapterRequest = Validation.validate(
      ChapterValidation.CREATE,
      request
    );

    const chapter = await prisma.chapter.create({
      data: {
        name: chapterRequest?.name,
        course_id: parseInt(chapterRequest?.course_id),
      },
    });
    return chapter;
  }

  static async getAllChapter(req: Request) {
    const { courseId, course_name } = req.query;

    const chapters = await prisma.chapter.findMany({
      where: {
        AND: [
          courseId ? { course_id: Number(courseId) } : {},
          course_name
            ? {
                Course: {
                  name: { contains: String(course_name), mode: "insensitive" },
                },
              }
            : {},
        ],
      },
      include: {
        Course: {
          select: {
            name: true,
          },
        },
        lessons: true,
      },
      orderBy: {
        id: "desc",
      },
    });
    return chapters;
  }

  static async updateChapter(id: number, req: Request) {
    const request = req.body;
    const chapterRequest = Validation.validate(
      ChapterValidation.UPDATE,
      request
    );
    const chapter = await prisma.chapter.update({
      where: {
        id: id,
      },
      data: {
        name: chapterRequest?.name,
        course_id: parseInt(chapterRequest?.course_id),
      },
    });
    return chapter;
  }

  static async deleteChapter(id: number) {
    const chapter = await prisma.chapter.delete({
      where: {
        id: id,
      },
    });
    return chapter;
  }
}
