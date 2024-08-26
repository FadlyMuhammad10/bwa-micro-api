import { NextFunction, Request, Response } from "express";
import { CategoryRequest } from "../model/category-model";
import CategoryService from "../service/category-service";

export class CategoryController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const request: CategoryRequest = req.body as CategoryRequest;

      const response = await CategoryService.createCategory(request);

      res.status(201).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await CategoryService.getCategories();
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const request: CategoryRequest = req.body as CategoryRequest;
      const response = await CategoryService.updateCategory(id, request);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const response = await CategoryService.deleteCategory(id);
      res.status(200).json({ data: response });
    } catch (error) {
      next(error);
    }
  }
}
