import { Module } from '@nestjs/common';
import { CountryController } from './country.controller';
import { CountryService } from './country.service';
import { RegionService } from '../region/region.service';
import { Country } from './country.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from '../region/region.entity';
import { LocationService } from '../location/location.service';
import { Location } from '../location/location.entity';
import { RolesGuard } from '../../../middleware/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([Country, Region, Location])],
  exports: [TypeOrmModule],
  controllers: [CountryController],
  providers: [
    CountryService,
    RegionService,
    LocationService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class CountryModule {}
