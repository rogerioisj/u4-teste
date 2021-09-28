import {MigrationInterface, QueryRunner} from "typeorm";

export class tokenEntityCreated1632798967853 implements MigrationInterface {
    name = 'tokenEntityCreated1632798967853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "token" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" text NOT NULL, "created_at" date NOT NULL, "expires_at" date NOT NULL, CONSTRAINT "PK_82fae97f905930df5d62a702fc9" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "token"`);
    }

}
