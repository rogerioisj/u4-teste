import * as Hapi from "@hapi/hapi";
import { RegisterControllerRoutes } from "../controllers/register.controller";
import { AuthControllerRoutes } from "../controllers/auth.controller";

export const start: Hapi.Plugin<undefined> = {
  name: "app/status",
  register: async function (server: Hapi.Server) {
    server.route({
      method: "GET",
      path: "/",
      handler: (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        return h
          .response({
            message: `Hello world!`,
          })
          .code(200);
      },
    });
  },
};

export const routes = [
  start,
  ...RegisterControllerRoutes,
  ...AuthControllerRoutes,
];
