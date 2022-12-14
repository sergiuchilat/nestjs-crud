import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const buildApiDocs = (app, ConfigEnv) => {
  const config = new DocumentBuilder()
    .setTitle(ConfigEnv.DOCS_TITLE)
    .setDescription(ConfigEnv.DOCS_DESCRIPTION)
    .setVersion(ConfigEnv.DOCS_VERSION)
    .addServer(ConfigEnv.API_SERVER_URL)
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      ConfigEnv.JWT_BEARER_AUTH_NAME,
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(ConfigEnv.DOCS_PATH, app, document);
};

export default buildApiDocs;
