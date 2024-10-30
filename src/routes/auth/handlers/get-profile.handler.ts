import { decrypt } from "@/utils/crypto";
import { AppRouteHandler } from "@/types";
import { GetProfile } from "../auth.routes";
import { OK } from "stoker/http-status-codes";
import { authResponses } from "@/config/responses";

type Handler = AppRouteHandler<GetProfile>;

export const getProfile: Handler = async (c) => {
  const fetchedUser = c.get("user-data");

  const fetchedUserSerialized = {
    username: fetchedUser.username,
    email: decrypt(fetchedUser.email),
    verified: fetchedUser.verified,
  };

  const data = { user: fetchedUserSerialized };
  return c.json({ ...authResponses.authorized, data }, OK);
};
