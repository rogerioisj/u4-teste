import * as Hapi from "@hapi/hapi";
import { RegisterService } from "../services/register.service";
import { Register } from "../entities/register.entity";

const RESOURCE = `register`;
const DB_CONSTRAINT_ERROR = "23505";

const create: Hapi.Plugin<undefined> = {
  name: "Create Register",
  register: async function (server: Hapi.Server) {
    server.route({
      method: "POST",
      path: `/${RESOURCE}/create`,
      options: {
        auth: "jwt"
      },
      handler: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        try {
          const registerService = new RegisterService();

          const register = new Register();

          register.rg = `MG17158143`;
          register.name = `Rogerio Inacio`;
          register.email = `rogerio.reaper@gmail.com`;
          register.cpf = `14811554744`;
          register.cellphone = `31991132503`;

          const registerResponse = await registerService.create(register);
          return h.response(registerResponse).code(201);
        } catch (e) {
          if (e.code === DB_CONSTRAINT_ERROR) {
            return h.response({ error: e.message }).code(400);
          }

          return h.response({ error: e.message }).code(500);
        }
      },
    });
  },
};

export const RegisterControllerRoutes = [create];
