import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from 'nestjs-dotenv';

const configService: ConfigService = new ConfigService();

const buildApiDocs = (app) => {
  const config = new DocumentBuilder()
    .setTitle('NestJS project API documentation')
    .setDescription('This is a sample NestJS project')
    .setVersion('1.0')
    .addTag('NestJS project API documentation')
    .addServer(configService.get('API_SERVER_URL'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};

export default buildApiDocs;
