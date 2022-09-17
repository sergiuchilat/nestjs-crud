import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Region } from './region.entity';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async getAll(): Promise<Region[]> {
    return await this.regionRepository.find();
  }

  async getOneById(id: number): Promise<Region> | undefined {
    return await this.regionRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(Region: Region): Promise<Region> | undefined {
    return this.regionRepository.save(Region);
  }

  async update(id: number, newValue: Region): Promise<Region> | undefined {
    await this.regionRepository.update(id, newValue);
    return this.getOneById(id);
  }

  async delete(id: number) {
    return await this.regionRepository.delete(id);
  }

  async getForCountry(countryId: number): Promise<Region[]> | undefined {
    return await this.regionRepository.find({
      where: {
        countryId,
      },
    });
  }
}
