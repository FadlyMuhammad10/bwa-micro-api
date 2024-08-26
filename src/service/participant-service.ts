import prisma from "../lib/prisma";

export default class ParticipantService {
  static async getAllCourse() {
    const courses = await prisma.course.findMany({
      where: {
        status: "active",
      },
      select: {
        id: true,
        name: true,
        thumbnail: true,
        level: true,
      },
    });
    return courses;
  }

  static async getCourseById(id: number) {
    const courses = await prisma.course.findMany({
      where: {
        id: id,
        status: "active",
      },
      include: {
        Category: true,
        chapters: {
          include: {
            lessons: true,
          },
        },
        Mentor: true,
      },
    });
    return courses;
  }
}
