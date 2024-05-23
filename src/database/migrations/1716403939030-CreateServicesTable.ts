import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateServicesTable1716403939030 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
               name: "services",
               columns: [
                  {
                     name: "id",
                     type: "int",
                     isPrimary: true,
                     isGenerated: true,
                     generationStrategy: "increment",
                  },
                  {
                     name: "name",
                     type: "varchar",
                     length: "100",
                     isUnique: true,
                  },
                  {
                    name: "description",
                    type: "text",
                 },

               ],
            }),
            true
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable("services");
    }

}
