import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CountryModule } from '../country/country.module';
import TypeOrmModuleInit from '../../database/config/type-orm-config';

@Module({
  imports: [CountryModule, TypeOrmModuleInit],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
