import { User } from "@/database";
import { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";

export type AppBindings = {
  Variables: {
    "user-data": User;
  };
};

export type AppOpenAPI = OpenAPIHono<AppBindings>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export type AccessDecodedToken = { userId: string };
export type ResetDecodedToken = { email: string };

export type AuthType = "credentials" | "google" | "facebook";
