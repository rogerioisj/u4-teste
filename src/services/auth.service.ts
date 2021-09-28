import { Client } from "../entities/client.entity";
import * as bcrypt from "bcrypt";
import { Connection, getConnection } from "typeorm";
import { Register } from "../entities/register.entity";
import { RegisterService } from "./register.service";
import * as Hapi from "@hapi/hapi";
import * as jwt from "jsonwebtoken";
import { Token } from "../entities/token.entity";
import * as dotenv from "dotenv";

dotenv.config();

export class AuthService {
  async create(client: Client) {
    const hashedPassword = await bcrypt.hash(client.password, 12);

    const connection: Connection = await getConnection();

    const registerService = new RegisterService();

    const register: Register = await registerService.findByCpf(
      client.register.cpf
    );

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

  async createToken(user: Client) {
    const token = jwt.sign(
      { id: user.id, login: user.login },
      process.env.JWT_SECRET,
      { algorithm: "HS256", expiresIn: process.env.TOKEN_EXPIRATION_TIME }
    );

    const tokenDecoded: any = jwt.decode(token);

    const connection: Connection = await getConnection();

    await connection.getRepository(Token).save({
      token: token,
      created_at: new Date(tokenDecoded.iat * 1000),
      expires_at: new Date(tokenDecoded.exp * 1000),
    });

    return token;
  }

  async login(login: string, password: string) {
    const connection: Connection = await getConnection();
    const user = await connection.getRepository(Client).findOne({ login });

    if (!user) {
      throw { message: "User not found", code: 400 };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw { message: "Password incorrect", code: 400 };
    }

    return await this.createToken(user);
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

  console.log(user)

  if (!user) {
    return { isValid: false };
  }

  return { isValid: true };
};
