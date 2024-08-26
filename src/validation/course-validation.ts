import { z, ZodType } from "zod";
export class CourseValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1),
    price: z.string().min(0),
    level: z.string().min(1).max(100),
    type: z.enum(["free", "premium"]),
    status: z.enum(["active", "inactive"]),
    mentor_id: z.string(),
    category_id: z.string(),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1),
    price: z.string().min(0),
    level: z.string().min(1).max(100),
    type: z.enum(["free", "premium"]),
    status: z.enum(["active", "inactive"]),
    mentor_id: z.string(),
    category_id: z.string(),
  });
}
