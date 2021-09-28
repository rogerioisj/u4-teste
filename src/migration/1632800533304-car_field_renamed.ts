import {MigrationInterface, QueryRunner} from "typeorm";

export class carFieldRenamed1632800533304 implements MigrationInterface {
    name = 'carFieldRenamed1632800533304'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."car" RENAME COLUMN "placa" TO "license_plate"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."car" RENAME COLUMN "license_plate" TO "placa"`);
    }

}
