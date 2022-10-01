import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CompanyService } from './company.service';
import { ApiTags } from '@nestjs/swagger';
import { CompanyCreateDto } from './dto/company.create';

@ApiTags('Companies')
@Controller('/companies')
export class CompanyController {
  constructor(
    @Inject(CompanyService) private readonly companyService: CompanyService,
  ) {}
  @Get('')
  async getAll() {
    return await this.companyService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.getOne(id);
  }

  @Post('')
  create(@Body() entity: CompanyCreateDto) {
    return this.companyService.create(entity);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() entity: CompanyCreateDto,
  ) {
    return this.companyService.update(id, entity);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.companyService.delete(id);
  }
}
