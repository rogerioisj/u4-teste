import {MigrationInterface, QueryRunner} from "typeorm";

export class clientEntityCreated1632779317449 implements MigrationInterface {
    name = 'clientEntityCreated1632779317449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "login" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, "registerId" uuid, CONSTRAINT "REL_70f96e858847dda0c41feb988e" UNIQUE ("registerId"), CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_70f96e858847dda0c41feb988ea" FOREIGN KEY ("registerId") REFERENCES "register"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_70f96e858847dda0c41feb988ea"`);
        await queryRunner.query(`DROP TABLE "client"`);
    }

}
