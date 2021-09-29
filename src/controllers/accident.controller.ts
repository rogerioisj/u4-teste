import * as Hapi from "@hapi/hapi";
import * as Joi from "joi";
import { Register } from "../entities/register.entity";
import { Accident } from "../entities/accident.entity";
import { AccidentService } from "../services/accident.service";
import { getConnection } from "typeorm";
import { Client } from "../entities/client.entity";

const RESOURCE = "accident";

const create = async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
  try {
    const token = request.headers.authorization.split(" ");

    const payload: any = request.payload;

    const registers = [];

    for (const register of payload.third_parties) {
      const newRegister = new Register();

      newRegister.name = register.name;
      newRegister.cpf = register.cpf;
      newRegister.rg = register.rg;
      newRegister.email = register.email;
      newRegister.cellphone = register.cellphone;

      registers.push(newRegister);
    }

    const accident = new Accident();

    accident.car_license_plate = payload.license_plate;
    accident.thirdParty = registers;

    const accidentService = new AccidentService();

    return h
      .response({ accident: await accidentService.create(accident, token[1]) })
      .code(201);
  } catch (e) {
    /*if (e.code) {
          return h.response({ error: e.message }).code(e.code);
        }*/
    return h.response({ error: e.message }).code(500);
  }
};

const accident: Hapi.Plugin<undefined> = {
  name: "accident",
  register: async function (server: Hapi.Server) {
    server.route([
      {
        method: "POST",
        path: `/${RESOURCE}/create`,
        handler: create,
        options: {
          auth: "jwt",
          validate: {
            payload: Joi.object({
              third_parties: Joi.array()
                .items({
                  name: Joi.string().required(),
                  email: Joi.string().email(),
                  cellphone: Joi.string(),
                  cpf: Joi.string().min(11).max(11).required(),
                  rg: Joi.string().min(8).max(10).required(),
                })
                .required(),
              license_plate: Joi.string().required(),
            }),
          },
        },
      },
    ]);
  },
};

export const AccidentControllerRoutes = [accident];
