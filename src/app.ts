import { Context } from "hono";
import { routers } from "./routes";
import { HTTPResponseError } from "hono/types";
import { createRouter, configureOpenAPI } from "@/utils/openapi";
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from "stoker/http-status-codes";

export const baseHandler = (c: Context) => {
  return c.json({ success: true, message: "Hello from elections maker api!" }, OK);
};

export const errorHandler = (_: Error | HTTPResponseError, c: Context) => {
  return c.json({ success: false, message: "Internal Server Error!" }, INTERNAL_SERVER_ERROR);
};

export const notFoundHandler = (c: Context) => {
  return c.json({ success: false, message: "Api endpoint not found!" }, NOT_FOUND);
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
