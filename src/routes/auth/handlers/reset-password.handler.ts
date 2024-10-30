import { hash } from "@/utils/bcrypt";
import { usersRepo } from "@/database";
import { encrypt } from "@/utils/crypto";
import { verifyToken } from "@/utils/jwt";
import { ResetPassword } from "../auth.routes";
import { authResponses } from "@/config/responses";
import { AppRouteHandler, ResetDecodedToken } from "@/types";
import { BAD_REQUEST, NOT_FOUND, OK } from "stoker/http-status-codes";

type Handler = AppRouteHandler<ResetPassword>;

export const resetPassword: Handler = async (c) => {
  const { password } = c.req.valid("json");
  const { token, email } = c.req.valid("query");

  try {
    const encryptedEmail = encrypt(email);
    const decoded = await verifyToken<ResetDecodedToken>(token);
    if (decoded.email !== encryptedEmail) return c.json(authResponses.notValid, BAD_REQUEST);

    const fetchedUser = usersRepo.findByEmail(encryptedEmail);
    if (!fetchedUser) return c.json(authResponses.credentialsInvalid, NOT_FOUND);

    const { currentResetToken } = fetchedUser;
    if (currentResetToken !== token) return c.json(authResponses.notValid, BAD_REQUEST);

    const userFields = { password: hash(password), currentResetToken: "" };
    usersRepo.update(fetchedUser.id, userFields);

    return c.json(authResponses.passwordChanged, OK);
  } catch (err) {
    return c.json(authResponses.notValid, BAD_REQUEST);
  }
};
