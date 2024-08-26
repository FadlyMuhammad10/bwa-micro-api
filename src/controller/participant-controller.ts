import { NextFunction, Request, Response } from "express";
import ParticipantService from "../service/participant-service";

export class ParticipantController {
  static async getAllCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ParticipantService.getAllCourse();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async getOneCourse(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await ParticipantService.getCourseById(id);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
