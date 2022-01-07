import {MigrationInterface, QueryRunner} from "typeorm";

export class RelationAccountUser1641562552366 implements MigrationInterface {
    name = 'RelationAccountUser1641562552366'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "CPF" character varying NOT NULL, "email" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "id_idAccount" character varying, CONSTRAINT "REL_2b75fd95134e8da0dcd1aa36c0" UNIQUE ("id_idAccount"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" character varying NOT NULL, "typeAccount" character varying NOT NULL, "balance" integer NOT NULL, "id_idUser" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "REL_8a45a3bd871094dbf3c3f0aad0" UNIQUE ("id_idUser"), CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_2b75fd95134e8da0dcd1aa36c08" FOREIGN KEY ("id_idAccount") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "accounts" ADD CONSTRAINT "FK_8a45a3bd871094dbf3c3f0aad0a" FOREIGN KEY ("id_idUser") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "accounts" DROP CONSTRAINT "FK_8a45a3bd871094dbf3c3f0aad0a"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_2b75fd95134e8da0dcd1aa36c08"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
