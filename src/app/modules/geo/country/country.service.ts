import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from './country.entity';
import { CountryCreateDto } from './dto/country.create.dto';
import { CountryItemDto } from './dto/country.item.dto';
import { plainToInstance } from 'class-transformer';
import { CountryWithRegionsDto } from './dto/country.with-regions.dto';
import { Region } from '../region/region.entity';
import { CountryCreateResponseDto } from './dto/country.create.response.dto';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { CountryItemDropdownDto } from './dto/country.item.dropdown.dto';
import { SortOrder } from '../../../validators/typeorm.sort.validator';
import { ColumnSortCountry } from './validators/column.sort.validator';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(Region)
    private regionRepository: Repository<Region>,
  ) {}

  async getAllForDropdown(): Promise<CountryItemDropdownDto[]> {
    try {
      return plainToInstance(
        CountryItemDropdownDto,
        await this.countryRepository.find(),
      );
    } catch (e) {
      throw new NotFoundException();
    }
  }

  async getAllPaginated(
    options: IPaginationOptions,
    sort_order: SortOrder,
    sort_by: ColumnSortCountry,
  ): Promise<Pagination<Country>> {
    try {
      const queryBuilder = this.countryRepository
        .createQueryBuilder('countries')
        .orderBy(sort_by, sort_order);
      return paginate<Country>(queryBuilder, options);
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

  async create(
    country: CountryCreateDto,
    user: any,
  ): Promise<CountryCreateResponseDto> | undefined {
    const countryEntity = plainToInstance(Country, country);

    const existingCountry = await this.countryRepository.findOne({
      where: [{ name: countryEntity.name }, { code: countryEntity.code }],
    });

    if (existingCountry) {
      throw new ConflictException();
    }
    countryEntity.createdBy = user.id;
    countryEntity.updatedBy = user.id;
    return await this.countryRepository.save(countryEntity);
  }

  async update(
    id: number,
    newValue: CountryCreateDto,
    user: any,
  ): Promise<CountryItemDto> | undefined {
    const countryEntity = plainToInstance(Country, newValue);
    countryEntity.updatedBy = user.id;
    await this.countryRepository.update(id, countryEntity);
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
