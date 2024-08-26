import { z, ZodType } from "zod";

export class ChapterValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    course_id: z.string(),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    course_id: z.string(),
  });
}
