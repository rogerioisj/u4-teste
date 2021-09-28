import { Client } from "../entities/client.entity";
import * as bcrypt from "bcrypt";
import { Connection, getConnection } from "typeorm";
import { Register } from "../entities/register.entity";
import { RegisterService } from "./register.service";
import * as Hapi from "@hapi/hapi";
import * as jwt from "jsonwebtoken";

export class AuthService {
  async create(client: Client) {
    const hashedPassword = await bcrypt.hash(client.password, 12);

    const connection: Connection = await getConnection();

    const registerService = new RegisterService();

    const register: Register = await registerService.findByCpf(
      client.register.cpf
    );

    console.log(register);

    if (!register) {
      await registerService.create(client.register);
    }

    const clientRepository = connection.getRepository(Client);

    const foundClient = await clientRepository.findOne({ login: client.login });

    if (foundClient) {
      throw { message: `User already exists`, code: 400 };
    }

    const savedClient = await clientRepository.save({
      login: client.login,
      password: hashedPassword,
      register: register,
    });

    delete savedClient.password;

    return savedClient;
  }

  createToken(user: Client) {
    return jwt.sign(
      { id: user.id, login: user.login },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: process.env.TOKEN_EXPIRATION_TIME }
    );
  }
}

export const validate = async (
  decoded: any,
  request: Hapi.Request,
  h: Hapi.ResponseToolkit
) => {
  const connection: Connection = await getConnection();
  const clientRepository = connection.getRepository(Client);

  const user = await clientRepository.findOne({ login: decoded.login });

  if (!user) {
    return { isValid: false };
  }

  const valid = await bcrypt.compare(decoded.password, user.password);

  return { isValid: valid };
};
