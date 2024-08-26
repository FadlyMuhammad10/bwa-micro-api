import { z, ZodType } from "zod";

export class LessonValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    video: z.string().min(1).max(100),
    chapter_id: z.string(),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    video: z.string().min(1).max(100),
    chapter_id: z.string(),
  });
}
