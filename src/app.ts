import { Context } from "hono";
import { routers } from "./routes";
import { HTTPResponseError } from "hono/types";
import { createRouter, configureOpenAPI } from "@/utils/openapi";

export const baseHandler = (c: Context) => {
  return c.json({ success: true, message: "Hello from elections maker api!" }, 200);
};

export const errorHandler = (_: Error | HTTPResponseError, c: Context) => {
  return c.json({ success: false, message: "Internal Server Error!" }, 500);
};

export const notFoundHandler = (c: Context) => {
  return c.json({ success: false, message: "Api endpoint not found!" }, 404);
};

export const bootstrapApplication = () => {
  const app = createRouter();

  app.all("/", baseHandler);
  app.notFound(notFoundHandler);
  app.onError(errorHandler);

  for (const router of routers) {
    app.route("/", router);
  }

  configureOpenAPI(app);

  return app;
};
