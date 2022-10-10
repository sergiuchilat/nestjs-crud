import * as dotenv from 'dotenv';
dotenv.config();

const ConfigEnv = {
  APP_DEV_MODE: process.env.APP_DEV_MODE,
  API_SERVER_URL: process.env.API_SERVER_URL,
  API_SERVER_PORT: process.env.API_SERVER_PORT,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_NAME: process.env.DB_NAME,
  DB_DRIVER: process.env.DB_DRIVER,
  JWT_BEARER_AUTH_NAME: process.env.JWT_BEARER_AUTH_NAME,
  JWT_TOKEN_EXPIRES_IN: process.env.JWT_TOKEN_EXPIRES_IN,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  DOCS_GENERATE: process.env.DOCS_GENERATE,
  DOCS_PATH: process.env.DOCS_PATH,
  DOCS_VERSION: process.env.DOCS_VERSION,
  DOCS_TITLE: process.env.DOCS_TITLE,
  DOCS_DESCRIPTION: process.env.DOCS_DESCRIPTION,
  APP_DEFAULT_TIMEOUT: Number(process.env.APP_DEFAULT_TIMEOUT),
};
export default ConfigEnv;
