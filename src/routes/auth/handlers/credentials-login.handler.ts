import { usersRepo } from "@/database";
import { compare } from "@/utils/bcrypt";
import { AppRouteHandler } from "@/types";
import { generateToken } from "@/utils/jwt";
import { CredentialsLogin } from "../auth.routes";
import { authResponses } from "@/config/responses";
import { NOT_FOUND, FORBIDDEN, OK } from "stoker/http-status-codes";

type Handler = AppRouteHandler<CredentialsLogin>;

export const creadentialsLogin: Handler = async (c) => {
  const { username, password } = c.req.valid("json");

  const fetchedUser = usersRepo.findByUsername(username);
  if (!fetchedUser) return c.json(authResponses.credentialsInvalid, NOT_FOUND);

  const passwordMatch = compare(fetchedUser.password, password);
  if (!passwordMatch) return c.json(authResponses.credentialsInvalid, NOT_FOUND);

  if (!fetchedUser.verified) return c.json(authResponses.notVerified, FORBIDDEN);

  const payload = { userId: fetchedUser.id };
  const accessToken = await generateToken(3600, payload);

  const data = { accessToken };
  return c.json({ ...authResponses.logged, data }, OK);
};
