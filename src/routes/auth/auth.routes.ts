import * as schemas from "./auth.schemas";
import { createRoute } from "@hono/zod-openapi";
import { responseSchema } from "@/types/schemas";
import { jsonContent } from "stoker/openapi/helpers";
import { authMiddleware } from "./middlewares/auth.middleware";
import { googleMiddleware } from "./middlewares/google.middleware";
import { facebookMiddleware } from "./middlewares/facebook.middleware";
import { NOT_FOUND, FORBIDDEN, OK, BAD_REQUEST } from "stoker/http-status-codes";

export const creadentialsLogin = createRoute({
  method: "post",
  path: "/auth/credentials-login",
  summary: "Login with credentials",
  request: { body: schemas.loginBody },
  responses: {
    [OK]: jsonContent(responseSchema, "OK response"),
    [NOT_FOUND]: jsonContent(responseSchema, "NOT_FOUND response"),
    [FORBIDDEN]: jsonContent(responseSchema, "FORBIDDEN response"),
  },
});

export const googleLogin = createRoute({
  method: "get",
  path: "/auth/google-login",
  summary: "Login with google",
  middleware: [googleMiddleware],
  responses: { [OK]: jsonContent(responseSchema, "OK response") },
});

export const facebookLogin = createRoute({
  method: "get",
  path: "/auth/facebook-login",
  summary: "Login with facebook",
  middleware: [facebookMiddleware],
  responses: { [OK]: jsonContent(responseSchema, "OK response") },
});

export const getProfile = createRoute({
  method: "get",
  path: "/auth/me",
  summary: "Get current user",
  middleware: [authMiddleware],
  responses: { [OK]: jsonContent(responseSchema, "OK response") },
});

export const forgotPassword = createRoute({
  method: "post",
  path: "/auth/forgot-password",
  summary: "Forgot password",
  request: { body: schemas.forgotBody },
  responses: {
    [OK]: jsonContent(responseSchema, "OK response"),
    [NOT_FOUND]: jsonContent(responseSchema, "NOT_FOUND response"),
    [FORBIDDEN]: jsonContent(responseSchema, "FORBIDDEN response"),
    [BAD_REQUEST]: jsonContent(responseSchema, "BAD_REQUEST response"),
  },
});

export const resetPassword = createRoute({
  method: "post",
  path: "/auth/reset-password",
  summary: "Reset password",
  request: { body: schemas.resetBody, query: schemas.resetQuery },
  responses: {
    [OK]: jsonContent(responseSchema, "OK response"),
    [NOT_FOUND]: jsonContent(responseSchema, "NOT_FOUND response"),
    [BAD_REQUEST]: jsonContent(responseSchema, "BAD_REQUEST response"),
  },
});

export type CredentialsLogin = typeof creadentialsLogin;
export type GoogleLogin = typeof googleLogin;
export type FacebookLogin = typeof facebookLogin;
export type GetProfile = typeof getProfile;
export type ForgotPassword = typeof forgotPassword;
export type ResetPassword = typeof resetPassword;
