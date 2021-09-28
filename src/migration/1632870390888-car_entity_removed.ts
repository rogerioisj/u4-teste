import {MigrationInterface, QueryRunner} from "typeorm";

export class carEntityRemoved1632870390888 implements MigrationInterface {
    name = 'carEntityRemoved1632870390888'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."accident" DROP CONSTRAINT "FK_af5ebfacbdd7eecf89f6f41b10c"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" DROP CONSTRAINT "REL_af5ebfacbdd7eecf89f6f41b10"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" DROP COLUMN "thirdPartyId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."accident" ADD "thirdPartyId" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."accident" ADD CONSTRAINT "REL_af5ebfacbdd7eecf89f6f41b10" UNIQUE ("thirdPartyId")`);
        await queryRunner.query(`ALTER TABLE "public"."accident" ADD CONSTRAINT "FK_af5ebfacbdd7eecf89f6f41b10c" FOREIGN KEY ("thirdPartyId") REFERENCES "register"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
