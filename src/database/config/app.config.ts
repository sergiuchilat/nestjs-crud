import { TypeOrmModule } from '@nestjs/typeorm';
import ConfigEnv from '../../config/config.env';

const driverType = (): 'mysql' | 'mariadb' => {
  if (ConfigEnv.DB_DRIVER === 'mariadb') {
    return 'mariadb';
  }
  return 'mysql';
};

export default TypeOrmModule.forRoot({
  type: driverType(),
  host: ConfigEnv.DB_HOST,
  port: Number(ConfigEnv.DB_PORT),
  username: ConfigEnv.DB_USER,
  password: ConfigEnv.DB_PASSWORD,
  database: ConfigEnv.DB_NAME,
  logging: true,
  autoLoadEntities: true,
  synchronize: Number(ConfigEnv.APP_DEV_MODE) === 1,
});
