import prisma from "../lib/prisma";
import {
  CategoryRequest,
  CategoryResponse,
  ToCategoryResponse,
} from "../model/category-model";
import { CategoryValidation } from "../validation/category-validation";
import { Validation } from "../validation/validation";

export default class CategoryService {
  static async createCategory(
    request: CategoryRequest
  ): Promise<CategoryResponse> {
    const categoryRequest = Validation.validate(
      CategoryValidation.CREATE,
      request
    );
    const category = await prisma.category.create({
      data: categoryRequest,
    });
    return ToCategoryResponse(category);
  }

  static async getCategories(): Promise<CategoryResponse[]> {
    const categories = await prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
    });
    return categories.map(ToCategoryResponse);
  }

  static async updateCategory(
    id: number,
    request: CategoryRequest
  ): Promise<CategoryResponse> {
    const updateRequest = Validation.validate(
      CategoryValidation.UPDATE,
      request
    );
    const updatedCategory = await prisma.category.update({
      where: {
        id: id,
      },
      data: updateRequest,
    });
    return ToCategoryResponse(updatedCategory);
  }

  static async deleteCategory(id: number): Promise<CategoryResponse> {
    const deletedCategory = await prisma.category.delete({
      where: { id: id },
    });
    return ToCategoryResponse(deletedCategory);
  }
}
