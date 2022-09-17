import { Module } from '@nestjs/common';

import TypeOrmModuleInit from '../database/config/type-orm-config';
import AppModules from '../modules';

@Module({
  imports: [TypeOrmModuleInit, ...AppModules],
})
export class AppModule {}
