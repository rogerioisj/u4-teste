import {MigrationInterface, QueryRunner} from "typeorm";

export class carEntityRemoved1632871209593 implements MigrationInterface {
    name = 'carEntityRemoved1632871209593'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."accident" DROP CONSTRAINT "FK_fa54b5911f44be1198d528b5046"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" RENAME COLUMN "carId" TO "car_license_plate"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" RENAME CONSTRAINT "REL_fa54b5911f44be1198d528b504" TO "UQ_728a6c846f70ba130d675c9e25e"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" DROP CONSTRAINT "UQ_728a6c846f70ba130d675c9e25e"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" DROP COLUMN "car_license_plate"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" ADD "car_license_plate" character varying(7) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."accident" DROP COLUMN "car_license_plate"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" ADD "car_license_plate" uuid`);
        await queryRunner.query(`ALTER TABLE "public"."accident" ADD CONSTRAINT "UQ_728a6c846f70ba130d675c9e25e" UNIQUE ("car_license_plate")`);
        await queryRunner.query(`ALTER TABLE "public"."accident" RENAME CONSTRAINT "UQ_728a6c846f70ba130d675c9e25e" TO "REL_fa54b5911f44be1198d528b504"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" RENAME COLUMN "car_license_plate" TO "carId"`);
        await queryRunner.query(`ALTER TABLE "public"."accident" ADD CONSTRAINT "FK_fa54b5911f44be1198d528b5046" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
