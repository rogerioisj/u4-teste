import { Register } from "../entities/register.entity";
import {Connection, getConnection} from "typeorm";

export class RegisterService {
  async create(register: Register): Promise<Register> {
    if (!register.name) {
      throw new Error(`Nome não pode ser vazio`);
    }

    if (!register.email) {
      throw new Error(`Email não pode ser vazio`);
    }

    if (!register.cpf || register.cpf.length < 11) {
      console.log(register.cpf);
      throw new Error(`CPF inválido`);
    }

    if (!register.rg || register.rg.length < 8) {
      throw new Error(`RG inválido`);
    }

    const connection: Connection = await getConnection();

    const userRepository = connection.getRepository(Register);

    await userRepository.save(register);

    return register;
  }

  async findById(id: string): Promise<Register> {
    if (!id) {
      throw {message: `Id can not be null`, code: 400}
    }

    const connection: Connection = await getConnection();

    const register = connection.getRepository(Register).findOne(id);

    if (!register) {
      return null;
    }

    return register;
  }

  async findByCpf(cpf: string): Promise<Register> {
    if (!cpf) {
      throw {message: `CPF can not be null`, code: 400}
    }
    const connection: Connection = await getConnection();

    const register = connection.getRepository(Register).findOne({ cpf: cpf});

    if (!register) {
      return null;
    }

    return register;
  }
}
