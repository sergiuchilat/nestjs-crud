import { Module } from '@nestjs/common';
import { RegionController } from './region.controller';
import { RegionService } from './region.service';
import { Region } from './region.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from '../country/country.entity';
import { Location } from '../location/location.entity';
import { LocationService } from '../location/location.service';

@Module({
  imports: [TypeOrmModule.forFeature([Region, Country, Location])],
  exports: [TypeOrmModule],
  controllers: [RegionController],
  providers: [RegionService, LocationService],
})
export class RegionModule {}
