import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../../modules/country/country.entity';

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'express_test',
  password: 'password',
  database: 'express_test',
  entities: [Country],
  synchronize: true,
});
