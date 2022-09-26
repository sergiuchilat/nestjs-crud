import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class CountriesSoftDelete1664179606305 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('countries', [
      new TableColumn({
        name: 'deletedAt',
        type: 'timestamp',
        isNullable: true,
        default: null,
      }),
      new TableColumn({
        name: 'deletedBy',
        type: 'int',
        isNullable: true,
        default: null,
      }),
    ]);
    await queryRunner.createForeignKey(
      'countries',
      new TableForeignKey({
        name: 'country_destroyer_fk',
        columnNames: ['deletedBy'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'RESTRICT',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('countries', 'country_destroyer_fk');
    await queryRunner.dropColumns('countries', ['deletedAt', 'deletedBy']);
  }
}
