import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateAppointmentsTable1716404373735 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'appointments',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "date",
                    type: "datetime",
                },
                {
                    name: "observations",
                    type: "text",
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '50',
                },
                {
                    name: 'user_id_client',
                    type: 'int',
                    isNullable: true,  
                },
                {
                    name: 'user_id_worker',
                    type: 'int',
                    isNullable: true,  
                },
                {
                    name: 'car_id',
                    type: 'int',
                    isNullable: true,  
                },
                {
                    name: 'service_id',
                    type: 'int',
                    isNullable: true,
                   
                },
            ],
        }), true);

        await queryRunner.createForeignKeys('appointments', [
            new TableForeignKey({
                columnNames: ['user_id_client'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['user_id_worker'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            })
        ]);

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            columnNames: ['car_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cars',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));

        await queryRunner.createForeignKey('appointments', new TableForeignKey({
            columnNames: ['service_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'services',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}

