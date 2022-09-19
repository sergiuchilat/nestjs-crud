import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { CountryCreateDto } from './dto/country.create.dto';
import { CountryItemDto } from './dto/country.item.dto';
import { plainToInstance } from 'class-transformer';
import { CountryWithRegionsDto } from './dto/country.with-regions.dto';
import { Region } from '../region/region.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async getAll(): Promise<CountryItemDto[]> {
    try {
      return plainToInstance(
        CountryItemDto,
        await this.countryRepository.find(),
      );
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getOneById(id: number): Promise<CountryItemDto> | undefined {
    try {
      return plainToInstance(
        CountryItemDto,
        await this.countryRepository.findOneOrFail({
          where: {
            id,
          },
        }),
      );
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async create(country: CountryCreateDto): Promise<CountryItemDto> | undefined {
    return this.countryRepository.save(plainToInstance(Country, country));
  }

  async update(
    id: number,
    newValue: CountryCreateDto,
  ): Promise<CountryItemDto> | undefined {
    await this.countryRepository.update(id, plainToInstance(Country, newValue));
    return this.getOneById(id);
  }

  async delete(id: number) {
    const country = await this.getOneById(id);
    if (!country) {
      throw new NotFoundException();
    }
    return await this.countryRepository.delete(id);
  }

  async getOneByIdWithRegions(
    id: number,
  ): Promise<CountryWithRegionsDto> | undefined {
    try {
      const country = plainToInstance(
        CountryWithRegionsDto,
        await this.countryRepository.findOneOrFail({
          where: {
            id,
          },
        }),
      );
      country.regions = await this.regionRepository.find({
        where: {
          countryId: id,
        },
      });
      return country;
    } catch (e) {
      throw new NotFoundException();
    }
  }
}
