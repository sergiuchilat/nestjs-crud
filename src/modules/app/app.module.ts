import { Module } from '@nestjs/common';

import TypeOrmModuleInit from '../../database/config/type-orm-config';
import { CountryModule } from '../country/country.module';
import { RegionModule } from '../region/region.module';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [TypeOrmModuleInit, CountryModule, RegionModule, LocationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
