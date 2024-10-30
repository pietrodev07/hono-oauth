import * as routes from "./auth.routes";
import * as handlers from "./auth.handlers";
import { createRouter } from "@/utils/openapi";

export const authRouter = createRouter()
  .openapi(routes.creadentialsLogin, handlers.creadentialsLogin)
  .openapi(routes.googleLogin, handlers.googleLogin)
  .openapi(routes.facebookLogin, handlers.facebookLogin)
  .openapi(routes.getProfile, handlers.getProfile)
  .openapi(routes.forgotPassword, handlers.forgotPassword)
  .openapi(routes.resetPassword, handlers.resetPassword);
