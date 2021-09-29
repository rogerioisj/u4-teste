import { Client } from "../entities/client.entity";
import * as bcrypt from "bcrypt";
import { Connection, getConnection } from "typeorm";
import { Register, UserRole } from "../entities/register.entity";
import { RegisterService } from "./register.service";
import * as Hapi from "@hapi/hapi";
import * as jwt from "jsonwebtoken";
import { Token } from "../entities/token.entity";
import * as dotenv from "dotenv";
import {JwtInterface} from "../interfaces/jwt.interface";

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

    if (register) {
      register.name = client.register.name;
      register.cpf = client.register.cpf;
      register.rg = client.register.rg;
      register.email = client.register.email;
      register.cellphone = client.register.cellphone;
      register.type = UserRole.CLIENT;
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

    const tokenDecoded: JwtInterface = <JwtInterface>jwt.decode(token);

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

  async edit(client: Client, token: string) {
    const tokenDecode: any = jwt.decode(token);

    const connection: Connection = await getConnection();

    const clientFound: any = await connection
      .createQueryBuilder()
      .select([
          `c.id as id`,
          `c.login as login`,
          `c.registerId as register_id`,
          `c.password as password`,
          `r.name as name`,
          `r.cpf as cpf`,
          `r.rg as rg`,
          `r.email as email`,
          `r.cellphone as cellphone`,
      ])
      .from(Client, `c`)
      .innerJoin(Register, "r", "c.registerId = r.id")
      .where(`c.id = :id`, { id: tokenDecode.id })
      .getRawOne();

    if (!clientFound) {
      throw { message: "User not found", code: 400 };
    }

    const newRegister = new Register();

    newRegister.id = clientFound.register_id;
    newRegister.name = client.register.name
      ? client.register.name
      : clientFound.name;
    newRegister.cpf = client.register.cpf
      ? client.register.cpf
      : clientFound.cpf;
    newRegister.rg = client.register.rg ? client.register.rg : clientFound.rg;
    newRegister.cellphone = client.register.cellphone
      ? client.register.cellphone
      : clientFound.cellphone;
    newRegister.email = client.register.email
      ? client.register.email
      : clientFound.email;

    const newClient = new Client();

    newClient.id = clientFound.id;
    newClient.login = client.login ? client.login : clientFound.login;
    newClient.password = client.password
      ? await bcrypt.hash(client.password, 12)
      : clientFound.password;
    newClient.register = newRegister;

    await connection
      .createQueryBuilder()
      .update(Register)
      .set({
        name: newRegister.name,
        cpf: newRegister.cpf,
        rg: newRegister.rg,
        cellphone: newRegister.cellphone,
        email: newRegister.email,
      })
      .where("id = :id", { id: newRegister.id })
      .execute();

    await connection
      .createQueryBuilder()
      .update(Client)
      .set({
        login: newClient.login,
        password: newClient.password,
      })
      .where("id = :id", { id: newClient.id })
      .execute();

    return newClient;
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

  return { isValid: true };
};
