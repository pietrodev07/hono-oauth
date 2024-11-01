import { usersRepo } from "@/database";
import { encrypt } from "@/utils/crypto";
import { AppRouteHandler } from "@/types";
import { generateToken } from "@/utils/jwt";
import { GoogleLogin } from "../auth.routes";
import { OK } from "stoker/http-status-codes";
import { authResponses } from "@/config/responses";

type Handler = AppRouteHandler<GoogleLogin>;

export const googleLogin: Handler = async (c) => {
  const user = c.get("user-google");

  const encryptedEmail = encrypt(user?.email || "");
  let fetchedUser = usersRepo.findByEmail(encryptedEmail);

  if (!fetchedUser) {
    fetchedUser = usersRepo.create({
      id: Math.random().toString(),
      username: user?.name || "",
      email: encryptedEmail,
      currentResetToken: "",
      password: "",
      verified: true,
    });
  }

  const payload = { userId: fetchedUser?.id };
  const accessToken = await generateToken(3600 * 3600, payload);

  const data = { accessToken };
  return c.json({ ...authResponses.googleLogged, data }, OK);
};
