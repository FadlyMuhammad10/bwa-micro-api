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
    const course = await prisma.course.findUnique({
      where: {
        id: id,
        status: "active",
      },
      include: {
        Category: true,
        chapters: {
          include: {
            lessons: {
              orderBy: {
                id: "asc",
              },
            },
          },
        },
        Mentor: true,
      },
    });

    return course;
  }
}
