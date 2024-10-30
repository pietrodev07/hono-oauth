import { env } from "@/config/env";
import { facebookAuth } from "@hono/oauth-providers/facebook";

export const facebookMiddleware = facebookAuth({
  client_id: env.FACEBOOK_ID,
  client_secret: env.FACEBOOK_SECRET,
  scope: ["email", "public_profile"],
  fields: [
    "email",
    "id",
    "first_name",
    "last_name",
    "middle_name",
    "name",
    "picture",
    "short_name",
  ],
});
