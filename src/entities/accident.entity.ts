import {Entity, JoinColumn, ManyToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { Register } from "./register.entity";
import { Car } from "./car.entity";

@Entity()
export class Accident {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToMany(() => Register)
  @JoinColumn()
  thirdParty: Register[];

  @OneToOne(() => Car)
  @JoinColumn()
  car: Car;
}
