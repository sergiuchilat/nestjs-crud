import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Country } from '../../app/modules/geo/country/country.entity';

export default class CreateCountriesSeed implements Seeder {
  public async run(factory: Factory, connection: Connection) {
    console.log('Country seeder');
    await connection
      .createQueryBuilder()
      .insert()
      .into(Country)
      .values([
        {
          name: 'Republica Moldova',
          code: 'MD',
          createdBy: 1,
          updatedBy: 1,
        },
      ])
      .execute();
  }
}
