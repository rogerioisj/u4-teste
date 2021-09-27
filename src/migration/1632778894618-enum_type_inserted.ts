import {MigrationInterface, QueryRunner} from "typeorm";

export class enumTypeInserted1632778894618 implements MigrationInterface {
    name = 'enumTypeInserted1632778894618'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."register_type_enum" AS ENUM('client', 'third_party')`);
        await queryRunner.query(`ALTER TABLE "public"."register" ADD "type" "public"."register_type_enum" NOT NULL DEFAULT 'third_party'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."register" DROP COLUMN "type"`);
        await queryRunner.query(`DROP TYPE "public"."register_type_enum"`);
    }

}
