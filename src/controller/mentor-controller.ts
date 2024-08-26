import { NextFunction, Request, Response } from "express";
import MentorService from "../service/mentor-service";

export class MentorController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await MentorService.createMentor(req);
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await MentorService.getAllMentor();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await MentorService.updateMentor(id, req);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await MentorService.deleteMentor(id);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
