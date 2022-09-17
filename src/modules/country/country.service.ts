import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { CountryCreateDto } from './dto/country.create.dto';
import { CountryItemDto } from './dto/country.item.dto';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<CountryItemDto>,
  ) {}

  async getAll(): Promise<CountryItemDto[]> {
    return await this.countryRepository.find();
  }

  async getOneById(id: number): Promise<CountryItemDto> | undefined {
    return await this.countryRepository.findOneOrFail({
      where: {
        id,
      },
    });
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
}
