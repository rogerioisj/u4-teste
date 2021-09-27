import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
