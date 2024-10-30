import { z } from "zod";

export const responseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.object({}).optional(),
});
