import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import buildApiDocs from './docs/swagger.builder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  buildApiDocs(app);
  await app.listen(3000);
}
bootstrap();
