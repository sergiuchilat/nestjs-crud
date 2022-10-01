import { MigrationInterface, QueryRunner, Table, TableColumn } from 'typeorm';

export class CreateTableCompanies1664539696219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          new TableColumn({
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            isNullable: false,
          }),
          new TableColumn({
            name: 'name',
            type: 'varchar',
            length: '50',
            isNullable: false,
          }),
          new TableColumn({
            name: 'address',
            type: 'varchar',
            length: '255',
            isNullable: false,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies');
  }
}
