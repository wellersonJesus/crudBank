import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Account1641393520557 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name:"accounts",
                columns:[
                    {
                        name:"id",
                        type:"uuid",
                        isPrimary:true
                    },
                    {
                        name:"typeAccount",
                        type:"varchar"
                    },
                    {
                        name:"balance",
                        type:"decimal"
                    },
                    {
                        name:"id_idUser",
                        type:"uuid"
                    },
                    {
                        name:"created_at",
                        type:"timestamp",
                        default:"now()"
                    }
                ],
                foreignKeys:[
                    {
                        name:"fk_accounts_user",
                        columnNames:["id_idUser"],
                        referencedTableName:"users",
                        referencedColumnNames:["id"]
                    }
                ]
            })
        )

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
