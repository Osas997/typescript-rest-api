import { ZodType, z } from "zod";

export class PostValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(100),
    body: z.string().min(1).max(1000),
    categories: z.array(z.number()),
  });

  static readonly UPDATE: ZodType = z.object({
    title: z.string().min(1).max(100).optional(),
    body: z.string().min(1).max(1000).optional(),
    categories: z.array(z.number()).optional(),
  });
}
