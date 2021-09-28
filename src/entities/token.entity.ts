import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Token {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text")
  token: string;

  @Column("timestamp")
  created_at: Date;

  @Column("timestamp")
  expires_at: Date;
}
