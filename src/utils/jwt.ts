import { env } from "@/config/env";
import { sign, verify } from "hono/jwt";

export const generateToken = async (exp: number, fields?: object) => {
  const iat = Math.floor(Date.now() / 1000);
  const payload = { ...fields, iat, exp: iat + exp };
  return await sign(payload, env.JWT_SECRET_KEY);
};

export const verifyToken = async <T>(token: string) => {
  const decoded = await verify(token, env.JWT_SECRET_KEY);
  return decoded as T;
};
