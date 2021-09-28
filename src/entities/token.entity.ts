import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  token: string;

  @Column("date")
  created_at: Date;

  @Column("date")
  expires_at: Date;
}
