import { Category } from "@prisma/client";

export type CategoryResponse = {
  id: number;
  nameCategory: string;
};
export type CategoryRequest = {
  nameCategory: string;
};

export function ToCategoryResponse(category: Category): CategoryResponse {
  return {
    id: category.id,
    nameCategory: category.nameCategory,
  };
}
