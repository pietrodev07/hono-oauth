import { z } from "zod";
import { jsonContentRequired } from "stoker/openapi/helpers";

const loginBodySchema = z.object({
  username: z.string().min(3),
  password: z.string().min(8),
});

const forgotBodySchema = z.object({
  email: z.string().email(),
});

const resetBodySchema = z.object({
  password: z.string().min(8),
});

const resetQuerySchema = z.object({
  token: z.string(),
  email: z.string().email(),
});

export const loginBody = jsonContentRequired(loginBodySchema, "Login Body Schema");
export const forgotBody = jsonContentRequired(forgotBodySchema, "Forgot Body Schema");
export const resetBody = jsonContentRequired(resetBodySchema, "Forgot Body Schema");
export const resetQuery = resetQuerySchema;
