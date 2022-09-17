import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import buildApiDocs from './docs/swagger.builder';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  buildApiDocs(app);
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
