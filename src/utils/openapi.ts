import { defaultHook } from "stoker/openapi";
import { OpenAPIHono } from "@hono/zod-openapi";
import { AppBindings, AppOpenAPI } from "@/types";
import { apiReference } from "@scalar/hono-api-reference";

import packageJSON from "../../package.json" with { type: "json" };

export const configureOpenAPI = (app: AppOpenAPI) => {
  app.doc("/doc", {
    openapi: "3.0.0",
    info: {
      title: "Hono OAuth API",
      version: packageJSON.version,
    },
  });

  app.get(
    "/reference",
    apiReference({
      theme: "none",
      defaultHttpClient: {
        targetKey: "javascript",
        clientKey: "fetch",
      },
      spec: { url: "/doc" },
    }),
  );
};

export const createRouter = () => {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
};
