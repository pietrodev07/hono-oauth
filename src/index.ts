import { custom } from "kittylog";
import { routers } from "./routes";
import { env } from "@/config/env";
import { showRoutes } from "hono/dev";
import { serve } from "@hono/node-server";
import { bootstrapApplication } from "./app";

const app = bootstrapApplication();

const serverConfig = {
  fetch: app.fetch,
  port: env.SERVER_PORT,
};

serve(serverConfig, () => {
  custom("cyan", "Server info", "");
  console.log(`STATUS: running`);
  console.log(`HOSTNAME: localhost`);
  console.log(`PORT: ${serverConfig.port}`);
  console.log(`URL: http://localhost:${serverConfig.port}\n`);

  custom("cyan", "Api routes", "");
  showRoutes(app);
});

export type AppType = (typeof routers)[number];
