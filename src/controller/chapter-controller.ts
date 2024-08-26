import { NextFunction, Request, Response } from "express";
import ChapterService from "../service/chapter-service";

export class ChapterController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ChapterService.createChapter(req);
      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await ChapterService.getAllChapter(req);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await ChapterService.updateChapter(id, req);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await ChapterService.deleteChapter(id);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
