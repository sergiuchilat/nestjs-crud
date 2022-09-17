import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-dotenv';

const configService: ConfigService = new ConfigService();

const driverType = (): 'mysql' | 'mariadb' => {
  if (configService.get('DB_DRIVER') === 'mariadb') {
    return 'mariadb';
  }
  return 'mysql';
};

export default TypeOrmModule.forRoot({
  type: driverType(),
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  autoLoadEntities: true,
  synchronize: Number(configService.get('APP_DEV_MODE')) === 1,
});
