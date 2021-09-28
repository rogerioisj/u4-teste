import {Column, Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Register } from "./register.entity";
import {Client} from "./client.entity";

@Entity()
export class Accident {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Client)
  @JoinColumn()
  client: Client;

  @Column("varchar", { length: 7 })
  car_license_plate: string;

  @ManyToMany(() => Register)
  @JoinColumn()
  thirdParty: Register[];
}
