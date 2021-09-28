import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Car {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 7 })
  license_plate: string;
}
