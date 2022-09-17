import { TypeOrmModule } from '@nestjs/typeorm';

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'express_test',
  password: 'password',
  database: 'express_test',
  autoLoadEntities: true,
  synchronize: true,
});
