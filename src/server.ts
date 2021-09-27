import * as Hapi from '@hapi/hapi';
import * as dotenv from 'dotenv';
import {Server} from "@hapi/hapi";

dotenv.config()

const server: Server = Hapi.server({  port: process.env.PORT || 3000,  host: process.env.HOST || `localhost`,});

export async function start(): Promise<Server> {
  server.route({
    method: 'GET',
    path: '/',
    handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
      return h.response('OK')
    }
  })

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
  return server;
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

start()
  .catch((err) => {
    console.log(err);
  });
