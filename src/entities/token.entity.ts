import {Column, PrimaryGeneratedColumn} from "typeorm";

export class Token {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    token: string;

    @Column("date")
    created_at: Date

    @Column("date")
    expires_at: Date
}
