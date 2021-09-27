import {JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Register} from "./register.entity";
import {Car} from "./car.entity";

export class Accident {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @OneToOne(() => Register)
    @JoinColumn()
    thirdParty: Register;

    @OneToOne(() => Car)
    @JoinColumn()
    car: Car;
}
