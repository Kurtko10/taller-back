import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersCarsTable1716403532934 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users_cars',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },           
                {
                    name: 'user_id',
                    type: 'int',
                },
                {
                    name: 'car_id',
                    type: 'int',
                },
            ],
        }), true);

        // Crear la clave foránea para user_id
        await queryRunner.createForeignKey('users_cars', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));

        // Crear la clave foránea para car_id
        await queryRunner.createForeignKey('users_cars', new TableForeignKey({
            columnNames: ['car_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'cars',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_cars');
    }

}

