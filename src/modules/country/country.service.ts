import { Injectable } from '@nestjs/common';
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
    private countryRepository: Repository<CountryItemDto>,
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async getAll(): Promise<CountryItemDto[]> {
    return plainToInstance(CountryItemDto, await this.countryRepository.find());
  }

  async getOneById(id: number): Promise<CountryItemDto> | undefined {
    return plainToInstance(
      CountryItemDto,
      await this.countryRepository.findOneOrFail({
        where: {
          id,
        },
      }),
    );
  }

  async create(country: CountryCreateDto): Promise<CountryItemDto> | undefined {
    return this.countryRepository.save(country);
  }

  async update(
    id: number,
    newValue: CountryCreateDto,
  ): Promise<CountryItemDto> | undefined {
    await this.countryRepository.update(id, newValue);
    return this.getOneById(id);
  }

  async delete(id: number) {
    return await this.countryRepository.delete(id);
  }

  async getOneByIdWithRegions(
    id: number,
  ): Promise<CountryWithRegionsDto> | undefined {
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
  }
}
