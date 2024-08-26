import { NextFunction, Request, Response } from "express";
import CourseService from "../service/course-service";

export class CourseController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CourseService.createCourse(req);
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CourseService.getAllCourse();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await CourseService.updateCourse(id, req);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await CourseService.deleteCourse(id);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await CourseService.changeStatusCourse(id);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
