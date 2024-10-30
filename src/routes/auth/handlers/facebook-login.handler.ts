import { usersRepo } from "@/database";
import { encrypt } from "@/utils/crypto";
import { AppRouteHandler } from "@/types";
import { generateToken } from "@/utils/jwt";
import { OK } from "stoker/http-status-codes";
import { FacebookLogin } from "../auth.routes";
import { authResponses } from "@/config/responses";

type Handler = AppRouteHandler<FacebookLogin>;

export const facebookLogin: Handler = async (c) => {
  const user = c.get("user-facebook");

  const encryptedEmail = encrypt(user?.email || "");
  let fetchedUser = usersRepo.findByEmail(encryptedEmail, "facebook");

  if (!fetchedUser) {
    fetchedUser = usersRepo.create({
      id: Math.random().toString(),
      username: user?.name || "",
      email: encryptedEmail,
      type: "facebook",
      currentResetToken: "",
      password: "",
      verified: true,
    });
  }

  const payload = { userId: fetchedUser?.id };
  const accessToken = await generateToken(3600 * 3600, payload);

  const data = { accessToken };
  return c.json({ ...authResponses.facebookLogged, data }, OK);
};
