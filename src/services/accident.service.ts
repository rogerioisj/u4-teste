import { Register } from "../entities/register.entity";
import { Accident } from "../entities/accident.entity";
import * as jwt from "jsonwebtoken";
import { Connection, getConnection } from "typeorm";
import { Client } from "../entities/client.entity";

export class AccidentService {
  async create(accident: Accident, token: string) {
    const tokenDecode: any = jwt.decode(token);

    const connection: Connection = await getConnection();

    const user = await connection.getRepository(Client).findOne(tokenDecode.id);

    const registers = [];

    for (const register of accident.thirdParty) {
      const foundRegister = await connection
        .getRepository(Register)
        .findOne({ cpf: register.cpf });

      if (!foundRegister) {
        const newRegister = new Register();
        newRegister.name = register.name;
        newRegister.cpf = register.cpf;
        newRegister.rg = register.rg;
        newRegister.email = register.email;
        newRegister.cellphone = register.cellphone;

        await connection.getRepository(Register).save(newRegister);

        registers.push(newRegister);
      }

      if (foundRegister) {
        registers.push(foundRegister);
      }
    }

    accident.thirdParty = [...registers];
    accident.client = user;

    await connection.getRepository(Accident).save(accident);

    return accident;
  }
}
