import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

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

    @Column({type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({type: 'varchar', length: 11, unique: true })
    cpf: string;

    @Column({type: 'varchar', length: 10, unique: true })
    rg: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.THIRD_PARTY
    })
    type: UserRole;
}
