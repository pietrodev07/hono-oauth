import { usersRepo } from "@/database";
import { AppRouteHandler } from "@/types";
import { sendForgotEmail } from "@/emails";
import { generateToken } from "@/utils/jwt";
import { ForgotPassword } from "../auth.routes";
import { decrypt, encrypt } from "@/utils/crypto";
import { authResponses } from "@/config/responses";
import { BAD_REQUEST, FORBIDDEN, NOT_FOUND, OK } from "stoker/http-status-codes";

type Handler = AppRouteHandler<ForgotPassword>;

export const forgotPassword: Handler = async (c) => {
  const { email } = c.req.valid("json");

  const fetchedUser = usersRepo.findByEmail(encrypt(email));
  if (!fetchedUser) return c.json(authResponses.credentialsInvalid, NOT_FOUND);

  if (!fetchedUser.verified) return c.json(authResponses.notVerified, FORBIDDEN);

  const payload = { email: fetchedUser.email };
  const resetToken = await generateToken(3600, payload);

  const { error } = await sendForgotEmail(fetchedUser.username, email, resetToken);
  if (error) return c.json(authResponses.emailNotSent, BAD_REQUEST);
  usersRepo.update(fetchedUser.id, { currentResetToken: resetToken });

  return c.json({ ...authResponses.forgotted }, OK);
};
