import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
  ) {}

  async getAll(): Promise<Country[]> {
    return await this.countryRepository.find();
  }

  async getOneById(id: number): Promise<Country> | undefined {
    return await this.countryRepository.findOne({
      where: {
        id,
      },
    });
  }

  async create(country: Country): Promise<Country> | undefined {
    return this.countryRepository.create(country);
  }
}
