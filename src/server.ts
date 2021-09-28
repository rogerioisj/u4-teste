import "reflect-metadata";
import * as Hapi from "@hapi/hapi";
import * as dotenv from "dotenv";
import { Server } from "@hapi/hapi";
import { routes } from "./plugins/routes";
import { createConnection } from "typeorm";

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
