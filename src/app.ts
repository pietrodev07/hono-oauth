import { Context } from "hono";
import { routers } from "./routes";
import { HTTPResponseError } from "hono/types";
import { generalResponses } from "./config/responses";
import { createRouter, configureOpenAPI } from "@/utils/openapi";
import { OK, INTERNAL_SERVER_ERROR, NOT_FOUND } from "stoker/http-status-codes";

export const baseHandler = (c: Context) => {
  return c.json(generalResponses.hello, OK);
};

export const errorHandler = (_: Error | HTTPResponseError, c: Context) => {
  return c.json(generalResponses.internalServerError, INTERNAL_SERVER_ERROR);
};

export const notFoundHandler = (c: Context) => {
  return c.json(generalResponses.endpointNotFound, NOT_FOUND);
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
