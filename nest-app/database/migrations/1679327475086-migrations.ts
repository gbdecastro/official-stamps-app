import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1679327475086 implements MigrationInterface {
    name = 'migrations1679327475086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "official_stamps" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "official_stamp_value" double precision NOT NULL, CONSTRAINT "PK_439ea43bf992631db8c6ba61eef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "address" character varying(255) NOT NULL, "balance" double precision NOT NULL, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registry_offices" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "county" character varying(255) NOT NULL, "city" character varying(255) NOT NULL, "region" character varying(255) NOT NULL, "wallet_id" integer, CONSTRAINT "REL_858e135a8fbe27028a2f7bdfa2" UNIQUE ("wallet_id"), CONSTRAINT "PK_8e9f19e9731a1503f927d8db43c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "registry_offices" ADD CONSTRAINT "FK_858e135a8fbe27028a2f7bdfa2d" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registry_offices" DROP CONSTRAINT "FK_858e135a8fbe27028a2f7bdfa2d"`);
        await queryRunner.query(`DROP TABLE "registry_offices"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "official_stamps"`);
    }

}
