import {MigrationInterface, QueryRunner} from "typeorm";

export class clientPkInsert1632872668762 implements MigrationInterface {
    name = 'clientPkInsert1632872668762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."accident" ADD "clientId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."accident" ADD CONSTRAINT "UQ_67fde81a4206da12f28e6bd2252" UNIQUE ("clientId")`);
        await queryRunner.query(`ALTER TABLE "public"."accident" ADD CONSTRAINT "FK_67fde81a4206da12f28e6bd2252" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."accident" DROP CONSTRAINT "FK_67fde81a4206da12f28e6bd2252"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" DROP CONSTRAINT "UQ_67fde81a4206da12f28e6bd2252"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" DROP COLUMN "clientId"`);
    }

}
