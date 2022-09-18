import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import buildApiDocs from './docs/swagger.builder';
import { ValidationPipe } from '@nestjs/common';
import ConfigEnv from './config/config.env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (Number(ConfigEnv.DOCS_GENERATE) === 1) {
    buildApiDocs(app, ConfigEnv);
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(ConfigEnv.API_SERVER_PORT);
}
bootstrap();
