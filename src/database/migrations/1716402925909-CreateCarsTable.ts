import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarsTable1716402925909 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cars',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'license_plate',
                    type: 'varchar',
                    length: "10",
                    isUnique: true,
                },
                {
                    name: 'car_brand',
                    type: 'varchar',
                    length: "100",
                },
                {
                    name: 'model',
                    type: 'varchar',
                    length: "100",
                },
                {
                    name: 'year',
                    type: 'int',
                    width: 4,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars');
    }
}

