import {MigrationInterface, QueryRunner} from "typeorm";

export class clientChangeType1632808872232 implements MigrationInterface {
    name = 'clientChangeType1632808872232'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."client" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "public"."client" ADD "password" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."client" DROP COLUMN "password"`);
        await queryRunner.query(`ALTER TABLE "public"."client" ADD "password" character varying(50) NOT NULL`);
    }

}
