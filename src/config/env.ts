import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  SERVER_PORT: z.coerce.number().default(3000),
  JWT_SECRET_KEY: z.string().min(32),

  FACEBOOK_ID: z.string(),
  FACEBOOK_SECRET: z.string(),

  GOOGLE_ID: z.string(),
  GOOGLE_SECRET: z.string(),

  ENCRYPTION_KEY: z.string().min(32),
  IV_KEY: z.string().min(16),

  RESEND_KEY: z.string(),
  RESEND_EMAIL: z.string().email(),

  FRONTEND_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);
