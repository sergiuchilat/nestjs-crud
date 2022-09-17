import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from 'nestjs-dotenv';

const configService: ConfigService = new ConfigService();

export default TypeOrmModule.forRoot({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: Number(configService.get('DB_PORT')),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  autoLoadEntities: true,
  synchronize: true,
});
