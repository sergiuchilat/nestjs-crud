import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const buildApiDocs = (app, configService) => {
  const config = new DocumentBuilder()
    .setTitle(configService.get('DOCS_TITLE'))
    .setDescription(configService.get('DOCS_DESCRIPTION'))
    .setVersion(configService.get('DOCS_VERSION'))
    .addServer(configService.get('API_SERVER_URL'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(configService.get('DOCS_PATH'), app, document);
};

export default buildApiDocs;
