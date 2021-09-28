import { Client } from "../entities/client.entity";
import * as bcrypt from "bcrypt";
import {Connection, createConnection, getConnection} from "typeorm";
import { Register } from "../entities/register.entity";
import { RegisterService } from "./register.service";

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

    const foundClient = clientRepository.findOne({ login: client.login})

    if (foundClient) {
      throw {message: `User already exists`, code: 400};
    }

    const savedClient = await clientRepository.save({
      login: client.login,
      password: hashedPassword,
      register: client.register,
    });

    delete savedClient.password;

    return savedClient;
  }
}
