import { z, ZodType } from "zod";

export class CategoryValidation {
  static readonly CREATE: ZodType = z.object({
    nameCategory: z.string().min(1).max(30),
  });

  static readonly UPDATE: ZodType = z.object({
    nameCategory: z.string().min(1).max(30),
  });
}
