import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import buildApiDocs from './docs/swagger.builder';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from 'nestjs-dotenv';

const configService: ConfigService = new ConfigService();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  if (Number(configService.get('DOCS_GENERATE')) === 1) {
    buildApiDocs(app, configService);
  }

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('API_SERVER_PORT'));
}
bootstrap();
