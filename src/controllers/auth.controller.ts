import * as Hapi from "@hapi/hapi";
import * as Joi from "joi";
import { Register, UserRole } from "../entities/register.entity";
import { AuthService } from "../services/auth.service";
import { Client } from "../entities/client.entity";
import {ClientInterface} from "../interfaces/client.interface";
import {LoginInterface} from "../interfaces/login.interface";

const RESOURCE = "auth";

const signup = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  try {
    const authService = new AuthService();

    const body: ClientInterface = <ClientInterface>request.payload;

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

    return {
      Authorization: await authService.createToken(newClient),
      newClient,
    };
  } catch (e) {
    if (e.code) {
      return h.response({ error: e.message }).code(e.code);
    }

    return h.response({ error: e.message }).code(500);
  }
};

const login = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  try {
    const user: LoginInterface = <LoginInterface>request.payload;

    const authService = new AuthService();

    return {
      Authorization: await authService.login(user.login, user.password),
    };
  } catch (e) {
    if (e.code) {
      return h.response({ error: e.message }).code(e.code);
    }

    return h.response({ error: e.message }).code(500);
  }
};

const edit = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  try {
    const token = request.headers.authorization.split(' ');

    const client: ClientInterface = <ClientInterface>request.payload;

    const registerReceived = new Register();

    registerReceived.id = client.register_id;
    registerReceived.name = client.name;
    registerReceived.cpf = client.cpf;
    registerReceived.rg = client.rg;
    registerReceived.email = client.email;
    registerReceived.cellphone = client.cellphone;

    const clientReceived = new Client();

    clientReceived.login = client.login;
    clientReceived.password = client.password;
    clientReceived.register = registerReceived;

    const authService = new AuthService();

    return h.response(await authService.edit(clientReceived, token[1])).code(200);
  } catch (e) {
    /*if (e.code) {
      return h.response({ error: e.message }).code(e.code);
    }*/
    return h.response({ error: e.message }).code(500);
  }
};

const auth: Hapi.Plugin<undefined> = {
  name: "auth/signup",
  register: async function (server: Hapi.Server) {
    server.route([
      {
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
      },
      {
        method: "POST",
        path: `/${RESOURCE}/login`,
        handler: login,
        options: {
          auth: false,
          validate: {
            payload: Joi.object({
              login: Joi.string().required(),
              password: Joi.string().required(),
            }),
          },
        },
      },
      {
        method: "PATCH",
        path: `/${RESOURCE}/edit`,
        handler: edit,
        options: {
          auth: "jwt",
          validate: {
            payload: Joi.object({
              name: Joi.string(),
              email: Joi.string().email(),
              cellphone: Joi.string(),
              cpf: Joi.string().min(11).max(11),
              rg: Joi.string().min(8).max(10),
              login: Joi.string(),
              password: Joi.string(),
            }),
          },
        },
      },
    ]);
  },
};

export const AuthControllerRoutes = [auth];
