import {MigrationInterface, QueryRunner} from "typeorm";

export class create_register_table1632777717230 implements MigrationInterface {
    name = 'create_register_table1632777717230'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "register" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "cellphone" character varying(11) NOT NULL, "email" character varying(50) NOT NULL, "cpf" character varying(11) NOT NULL, "rg" character varying(10) NOT NULL, CONSTRAINT "PK_14473cc8f2caa81fd19f7648d54" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "register"`);
    }

}
