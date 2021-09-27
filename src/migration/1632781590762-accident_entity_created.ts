import {MigrationInterface, QueryRunner} from "typeorm";

export class accidentEntityCreated1632781590762 implements MigrationInterface {
    name = 'accidentEntityCreated1632781590762'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accident" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "thirdPartyId" uuid, "carId" uuid, CONSTRAINT "REL_af5ebfacbdd7eecf89f6f41b10" UNIQUE ("thirdPartyId"), CONSTRAINT "REL_fa54b5911f44be1198d528b504" UNIQUE ("carId"), CONSTRAINT "PK_1abf08fec006d2a8348dc6f0d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "accident" ADD CONSTRAINT "FK_af5ebfacbdd7eecf89f6f41b10c" FOREIGN KEY ("thirdPartyId") REFERENCES "register"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accident" ADD CONSTRAINT "FK_fa54b5911f44be1198d528b5046" FOREIGN KEY ("carId") REFERENCES "car"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accident" DROP CONSTRAINT "FK_fa54b5911f44be1198d528b5046"`);
        await queryRunner.query(`ALTER TABLE "accident" DROP CONSTRAINT "FK_af5ebfacbdd7eecf89f6f41b10c"`);
        await queryRunner.query(`DROP TABLE "accident"`);
    }

}
