import { NextFunction, Request, Response } from "express";
import LessonService from "../service/lesson-service";

export class LessonController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await LessonService.createLesson(req);
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await LessonService.getAllLesson();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await LessonService.updateLesson(id, req);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await LessonService.deleteLesson(id);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
