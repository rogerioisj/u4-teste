import {MigrationInterface, QueryRunner} from "typeorm";

export class timestamp1632858233587 implements MigrationInterface {
    name = 'timestamp1632858233587'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."token" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."token" ADD "created_at" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."token" DROP COLUMN "expires_at"`);
        await queryRunner.query(`ALTER TABLE "public"."token" ADD "expires_at" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."token" DROP COLUMN "expires_at"`);
        await queryRunner.query(`ALTER TABLE "public"."token" ADD "expires_at" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."token" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "public"."token" ADD "created_at" date NOT NULL`);
    }

}
