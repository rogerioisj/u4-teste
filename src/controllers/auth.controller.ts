import * as Hapi from "@hapi/hapi";
import * as Joi from "joi";
import { Register, UserRole } from "../entities/register.entity";
import { AuthService } from "../services/auth.service";
import { Client } from "../entities/client.entity";

const RESOURCE = "auth";

const signup = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  try {
    const authService = new AuthService();

    const body: any = request.payload;

    const newRegister = new Register();
    newRegister.name = body.name;
    newRegister.email = body.email;
    newRegister.cpf = body.cpf;
    newRegister.rg = body.rg;
    newRegister.cellphone = body.cellphone;
    newRegister.type = UserRole.CLIENT;

    let newClient = new Client();

    newClient.login = body.login;
    newClient.password = body.password;
    newClient.register = newRegister;

    newClient = await authService.create(newClient);

    return {Authorization: await authService.createToken(newClient),newClient};
  } catch (e) {
    if (e.code) {
      return h.response({ error: e.message }).code(e.code);
    }

    return h.response({ error: e.message }).code(500);
  }
};

const signUp: Hapi.Plugin<undefined> = {
  name: "auth/signup",
  register: async function (server: Hapi.Server) {
    server.route({
      method: "POST",
      path: `/${RESOURCE}/signup`,
      handler: signup,
      options: {
        auth: false,
        validate: {
          payload: Joi.object({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            cellphone: Joi.string().required(),
            cpf: Joi.string().min(11).max(11).required(),
            rg: Joi.string().min(8).max(10).required(),
            login: Joi.string().required(),
            password: Joi.string().required(),
          }),
        },
      },
    });
  },
};

export const AuthControllerRoutes = [signUp];
