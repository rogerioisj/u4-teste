import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Register} from "./register.entity";

@Entity()
export class Client {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 50})
    login: string;

    @Column('varchar', { length: 50})
    password: string;

    @OneToOne(() => Register)
    @JoinColumn()
    register: Register
}
