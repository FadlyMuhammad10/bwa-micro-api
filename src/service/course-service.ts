import { Request } from "express";
import {
  CourseRequest,
  CourseResponse,
  ToCourseResponse,
} from "../model/course-model";
import { Validation } from "../validation/validation";
import { CourseValidation } from "../validation/course-validation";
import prisma from "../lib/prisma";
import { ResponseError } from "../error/response-error";
import cloudinary from "../lib/cloudinary";

interface UploadThumbnail {
  secure_url: string | null;
  public_id: string;
}

export default class CourseService {
  static async createCourse(req: Request): Promise<CourseResponse> {
    const request = req.body as CourseRequest;
    const courseRequest = Validation.validate(CourseValidation.CREATE, request);

    const check = await prisma.course.findFirst({
      where: {
        name: courseRequest.name,
      },
    });

    if (check) throw new ResponseError(400, "Course name already exist");

    if (!req.file) {
      throw new Error("No file attached to the request");
    }

    const uploadThumbnail = await cloudinary.v2.uploader.upload(
      req.file?.path,
      {
        folder: "bwaMicroExpress/course",
      }
    );

    const course = await prisma.course.create({
      data: {
        name: courseRequest.name,
        type: courseRequest.type,
        description: courseRequest.description,
        price: parseInt(courseRequest.price),
        level: courseRequest.level,
        status: courseRequest.status,
        mentor_id: parseInt(courseRequest.mentor_id),
        category_id: parseInt(courseRequest.category_id),
        thumbnail: uploadThumbnail.secure_url,
        public_id: uploadThumbnail.public_id,
      },
    });

    return ToCourseResponse(course);
  }

  static async getAllCourse() {
    const courses = await prisma.course.findMany({
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

  static async updateCourse(id: number, req: Request): Promise<CourseResponse> {
    const request = req.body as CourseRequest;
    const courseRequest = Validation.validate(CourseValidation.UPDATE, request);

    const check = await prisma.course.findFirst({
      where: {
        name: courseRequest.name,
        id: { not: id },
      },
    });

    if (check) throw new ResponseError(400, "Course name already exist");

    let uploadThumbnail: Partial<UploadThumbnail> = {};

    if (req.file) {
      const checkThumbnail = await prisma.course.findUnique({
        where: { id: id },
      });

      if (!checkThumbnail?.public_id)
        throw new ResponseError(404, "Course Thumbnail not found");

      await cloudinary.v2.uploader.destroy(checkThumbnail?.public_id);

      uploadThumbnail = await cloudinary.v2.uploader.upload(req.file?.path, {
        folder: "bwaMicroExpress/course",
      });
    } else {
      // If no new file is uploaded, retain the existing thumbnail
      const existingCourse = await prisma.course.findUnique({
        where: { id: id },
      });

      if (!existingCourse?.public_id)
        throw new ResponseError(404, "Course Thumbnail not found");

      uploadThumbnail = {
        secure_url: existingCourse.thumbnail, // Use the existing thumbnail URL
        public_id: existingCourse.public_id, // Use the existing public_id
      };
    }

    const course = await prisma.course.update({
      where: { id: id },
      data: {
        name: courseRequest.name,
        type: courseRequest.type,
        description: courseRequest.description,
        price: parseInt(courseRequest.price),
        level: courseRequest.level,
        status: courseRequest.status,
        mentor_id: parseInt(courseRequest.mentor_id),
        category_id: parseInt(courseRequest.category_id),
        thumbnail: uploadThumbnail.secure_url,
        public_id: uploadThumbnail.public_id,
      },
    });

    return ToCourseResponse(course);
  }

  static async deleteCourse(id: number): Promise<CourseResponse> {
    const course = await prisma.course.delete({
      where: { id: id },
    });

    if (!course?.public_id) throw new ResponseError(404, "Course not found");

    await cloudinary.v2.uploader.destroy(course?.public_id);
    return ToCourseResponse(course);
  }

  static async changeStatusCourse(id: number): Promise<CourseResponse> {
    const course = await prisma.course.update({
      where: { id: id },
      data: { status: "active" },
    });
    return ToCourseResponse(course);
  }
}
