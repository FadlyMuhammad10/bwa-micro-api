import { z, ZodType } from "zod";

export class MentorValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    profession: z.string(),
  });
  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    email: z.string().email(),
    profession: z.string(),
  });
}
