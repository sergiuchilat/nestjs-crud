import { DataSource } from 'typeorm';
import ConfigEnv from '../../config/config.env';

const driverType = (): 'mysql' | 'mariadb' => {
  if (ConfigEnv.DB_DRIVER === 'mariadb') {
    return 'mariadb';
  }
  return 'mysql';
};

export default new DataSource({
  type: driverType(),
  host: ConfigEnv.DB_HOST,
  port: Number(ConfigEnv.DB_PORT),
  username: ConfigEnv.DB_USER,
  password: ConfigEnv.DB_PASSWORD,
  database: ConfigEnv.DB_NAME,
  entities: [__dirname + '../../modules/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: true,
  logging: true,
});
