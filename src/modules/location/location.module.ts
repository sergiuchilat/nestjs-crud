import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { Location } from './location.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Region } from '../region/region.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Location, Region])],
  exports: [TypeOrmModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
