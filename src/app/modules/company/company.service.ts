import { Injectable } from '@nestjs/common';
import { CompanyEntity } from './company.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyCreateDto } from './dto/company.create';
import { plainToInstance } from 'class-transformer';
import { CompanyResponseDto } from './dto/company.response';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly companyRepository: Repository<CompanyEntity>,
  ) {}

  async getAll(): Promise<CompanyEntity[]> {
    return this.companyRepository.find();
  }

  async getOne(id: number): Promise<CompanyResponseDto> {
    return await this.companyRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async create(entity: CompanyCreateDto): Promise<CompanyEntity> {
    return this.companyRepository.save(entity);
  }

  async update(
    id: number,
    entity: CompanyCreateDto,
  ): Promise<CompanyResponseDto> {
    const newValue = plainToInstance(CompanyEntity, entity);
    await this.companyRepository.update(id, newValue);
    return this.companyRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async delete(id: number) {
    return await this.companyRepository.delete(id);
  }
}
