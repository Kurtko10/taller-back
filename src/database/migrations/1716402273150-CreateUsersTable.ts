import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1709965467557 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },           
                {
                    name: 'first_name',
                    type: 'varchar',
                    length: "50",
                },
                {
                    name: 'last_name',
                    type: 'varchar',
                    length: "50",
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true,
                },
                {
                    name: 'phone',
                    type: 'varchar',
                    isUnique: true,
                },
                 {
                    name: 'password',
                    type: 'varchar',
                    length: "255",
                },
                {
                    name: "is_active",
                    type: "boolean",
                    default: true,
                 },
                {
                    name: 'role_id',
                    type: 'int',
                },
            ], 
            foreignKeys:[
                {
                columnNames: ['role_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'roles', 
                },
            ],
        }), true
        
        );

       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
