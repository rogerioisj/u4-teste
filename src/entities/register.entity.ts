import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRole {
    CLIENT = "client",
    THIRD_PARTY = "third_party",
}

@Entity()
export class Register {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar', { length: 50})
    name: string;

    @Column('varchar', { length: 11 })
    cellphone: string;

    @Column('varchar', { length: 50})
    email: string;

    @Column('varchar', { length: 11 })
    cpf: string;

    @Column('varchar', { length: 10 })
    rg: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.THIRD_PARTY
    })
    type: UserRole
}
