import {MigrationInterface, QueryRunner} from "typeorm";

export class setUniqueFieldsRegisterEntity1632789584859 implements MigrationInterface {
    name = 'setUniqueFieldsRegisterEntity1632789584859'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."register" ADD CONSTRAINT "UQ_a25c9faec6801989b434563ed1b" UNIQUE ("email")`);
        await queryRunner.query(`ALTER TABLE "public"."register" ADD CONSTRAINT "UQ_4402b06dd00848c1d410def231d" UNIQUE ("cpf")`);
        await queryRunner.query(`ALTER TABLE "public"."register" ADD CONSTRAINT "UQ_2da5ad65ba266e971656b43b26e" UNIQUE ("rg")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."register" DROP CONSTRAINT "UQ_2da5ad65ba266e971656b43b26e"`);
        await queryRunner.query(`ALTER TABLE "public"."register" DROP CONSTRAINT "UQ_4402b06dd00848c1d410def231d"`);
        await queryRunner.query(`ALTER TABLE "public"."register" DROP CONSTRAINT "UQ_a25c9faec6801989b434563ed1b"`);
    }

}
