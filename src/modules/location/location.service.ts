import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Location } from './location.entity';
import { Region } from '../region/region.entity';

@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository: Repository<Location>,
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async getAll(): Promise<Location[]> {
    return await this.locationRepository.find();
  }

  async getOneById(id: number): Promise<Location> | undefined {
    return await this.locationRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(Location: Location): Promise<Location> | undefined {
    return this.locationRepository.save(Location);
  }

  async update(id: number, newValue: Location): Promise<Location> | undefined {
    await this.locationRepository.update(id, newValue);
    return this.getOneById(id);
  }

  async delete(id: number) {
    return await this.locationRepository.delete(id);
  }

  async getForRegion(regionId: number): Promise<Location[]> | undefined {
    return await this.locationRepository.find({
      where: {
        regionId,
      },
    });
  }

  async getForCountry(countryId: number) {
    const regions = await this.regionRepository.find({
      where: {
        countryId,
      },
    });

    return await this.locationRepository.find({
      where: {
        regionId: In(regions.map((region) => region.id)),
      },
    });
  }
}
