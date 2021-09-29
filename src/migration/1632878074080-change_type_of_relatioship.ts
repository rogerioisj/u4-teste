import {MigrationInterface, QueryRunner} from "typeorm";

export class changeTypeOfRelatioship1632878074080 implements MigrationInterface {
    name = 'changeTypeOfRelatioship1632878074080'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "accident_third_party_register" ("accidentId" uuid NOT NULL, "registerId" uuid NOT NULL, CONSTRAINT "PK_6bb732ae24bf2e8d61556c19e11" PRIMARY KEY ("accidentId", "registerId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f00dac7805357401105d7235fb" ON "accident_third_party_register" ("accidentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9e15083ff4392ce99e1bd67977" ON "accident_third_party_register" ("registerId") `);
        await queryRunner.query(`ALTER TABLE "accident_third_party_register" ADD CONSTRAINT "FK_f00dac7805357401105d7235fb0" FOREIGN KEY ("accidentId") REFERENCES "accident"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "accident_third_party_register" ADD CONSTRAINT "FK_9e15083ff4392ce99e1bd679779" FOREIGN KEY ("registerId") REFERENCES "register"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accident_third_party_register" DROP CONSTRAINT "FK_9e15083ff4392ce99e1bd679779"`);
        await queryRunner.query(`ALTER TABLE "accident_third_party_register" DROP CONSTRAINT "FK_f00dac7805357401105d7235fb0"`);
        await queryRunner.query(`DROP INDEX "IDX_9e15083ff4392ce99e1bd67977"`);
        await queryRunner.query(`DROP INDEX "IDX_f00dac7805357401105d7235fb"`);
        await queryRunner.query(`DROP TABLE "accident_third_party_register"`);
    }

}
