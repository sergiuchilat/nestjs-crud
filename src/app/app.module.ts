import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import TypeOrmModuleInit from '../database/config/app.config';
import AppModules from './modules';
import Middlewares from './middleware';

@Module({
  imports: [TypeOrmModuleInit, ...AppModules],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    Middlewares.forEach((middleware) => {
      consumer.apply(middleware.guard).forRoutes(middleware.routes);
    });
  }
}
