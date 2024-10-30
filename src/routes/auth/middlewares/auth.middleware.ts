import { usersRepo } from "@/database";
import { getCookie } from "hono/cookie";
import { verifyToken } from "@/utils/jwt";
import { AccessDecodedToken } from "@/types";
import { createMiddleware } from "hono/factory";
import { authResponses } from "@/config/responses";

export const authMiddleware = createMiddleware(async (c, next) => {
  try {
    const token = getCookie(c, "accessToken");

    if (!token) return c.json(authResponses.notAuthorized, 401);
    const { userId } = await verifyToken<AccessDecodedToken>(token);

    const fetchedUser = usersRepo.findById(userId);
    if (!fetchedUser) return c.json(authResponses.notAuthorized, 401);

    c.set("user-data", fetchedUser);
    return await next();
  } catch (error) {
    return c.json(authResponses.notAuthorized, 401);
  }
});
