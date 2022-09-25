import { ConfigService } from 'nestjs-dotenv';

const configService: ConfigService = new ConfigService();

const ConfigEnv = {
  APP_DEV_MODE: configService.get('APP_DEV_MODE'),
  API_SERVER_URL: configService.get('API_SERVER_URL'),
  API_SERVER_PORT: configService.get('API_SERVER_PORT'),
  DB_HOST: configService.get('DB_HOST'),
  DB_PORT: configService.get('DB_PORT'),
  DB_USER: configService.get('DB_USER'),
  DB_PASSWORD: configService.get('DB_PASSWORD'),
  DB_NAME: configService.get('DB_NAME'),
  DB_DRIVER: configService.get('DB_DRIVER'),
  JWT_BEARER_AUTH_NAME: configService.get('JWT_BEARER_AUTH_NAME'),
  JWT_TOKEN_EXPIRES_IN: configService.get('JWT_TOKEN_EXPIRES_IN'),
  JWT_SECRET_KEY: configService.get('JWT_SECRET_KEY'),
  DOCS_GENERATE: configService.get('DOCS_GENERATE'),
  DOCS_PATH: configService.get('DOCS_PATH'),
  DOCS_VERSION: configService.get('DOCS_VERSION'),
  DOCS_TITLE: configService.get('DOCS_TITLE'),
  DOCS_DESCRIPTION: configService.get('DOCS_DESCRIPTION'),
  APP_DEFAULT_TIMEOUT: configService.getWithType(
    'APP_DEFAULT_TIMEOUT',
    'number',
  ),
};
export default ConfigEnv;
