import "reflect-metadata";
import * as Hapi from "@hapi/hapi";
import * as dotenv from "dotenv";
import { Server } from "@hapi/hapi";
import { routes } from "./plugins/routes";
import { createConnection } from "typeorm";
const HapiJWT = require('hapi-jsonwebtoken');
import { validate } from "./services/auth.service";
import * as hapiAuthJwt2 from "hapi-auth-jwt2";

dotenv.config();

createConnection()
  .then(() => {
    console.log(`DB connected`);
  })
  .catch((e) => {
    console.log(e);
  });

const server: Server = Hapi.server({
  port: process.env.PORT || 3000,
  host: process.env.HOST || `localhost`,
});

export async function start(): Promise<Server> {
  /*await server.register(HapiJWT.plugin);

  server.auth.strategy("authenticate", "hapi-jsonwebtoken", {
    secretOrPrivateKey: process.env.JWT_SECRET,
    sign: {},
    decode: {},
    verify: {},
    getToken: (request: Hapi.Request) => {
      return request.headers.authorization;
    },
    validate,
  });
  server.auth.default("jwt");*/

  await server.register(hapiAuthJwt2);
  server.auth.strategy('jwt', 'jwt',
      { key: process.env.JWT_SECRET,
        validate
      });

  await server.auth.default('jwt');

  await server.register(routes);

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
  return server;
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

start().catch((err) => {
  console.log(err);
});
