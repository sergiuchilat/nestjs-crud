import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CountryService } from './country.service';
import { RegionService } from '../region/region.service';
import { LocationService } from '../location/location.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { CountryCreateDto } from './dto/country.create.dto';
import { CountryItemDto } from './dto/country.item.dto';
import { LocationItemDto } from '../location/dto/location.item.dto';
import { RegionItemDto } from '../region/dto/region.item.dto';
import { RolesGuard } from '../../user/roles/roles.decorator';
import { UserRole } from '../../user/roles/role.enum';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import ConfigPagination from '../../../../config/config.pagination';

@ApiTags('Countries')
@Controller('/countries')
// @UseFilters(AllExceptionsFilter)
export class CountryController {
  constructor(
    private readonly countryService: CountryService,
    private readonly regionService: RegionService,
    private readonly locationService: LocationService,
  ) {}

  @Get('')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get list of countries' })
  @ApiParam({ name: 'page', description: 'Page number', type: 'number' })
  @ApiParam({ name: 'limit', description: 'Page size', type: 'number' })
  @ApiOkResponse({
    description: 'List of countries',
    type: CountryItemDto,
    isArray: true,
  })
  async getAllPaginated(
    @Query('page', new DefaultValuePipe(ConfigPagination.page), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(ConfigPagination.limit), ParseIntPipe)
    limit: number,
    @Res() response: Response,
  ) {
    const options: IPaginationOptions = {
      page,
      limit,
    };
    response
      .status(HttpStatus.OK)
      .json(await this.countryService.getAllPaginated(options));
  }

  @Get('dropdown')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get list of countries' })
  @ApiParam({ name: 'page', description: 'Page number', type: 'number' })
  @ApiParam({ name: 'limit', description: 'Page size', type: 'number' })
  @ApiOkResponse({
    description: 'List of countries',
    type: CountryItemDto,
    isArray: true,
  })
  async getAllForDropdown(@Res() response: Response) {
    response
      .status(HttpStatus.OK)
      .json(await this.countryService.getAllForDropdown());
  }

  @Get(':id')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get One country by Id' })
  @ApiParam({ name: 'id', description: 'Country id', type: 'number' })
  @ApiOkResponse({
    description: 'Country item',
    type: CountryItemDto,
    isArray: false,
  })
  async getOneById(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.countryService.getOneById(id));
  }

  @Post()
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new country' })
  @ApiOkResponse({
    description: 'Added country',
    type: CountryItemDto,
    isArray: true,
  })
  async create(
    @Body() createCountryDto: CountryCreateDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.countryService.create(createCountryDto, request.user));
  }

  @Patch(':id')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a country by Id' })
  @ApiParam({ name: 'id', description: 'Country id', type: 'number' })
  @ApiOkResponse({
    description: 'Updated country',
    type: CountryItemDto,
    isArray: true,
  })
  async update(
    @Body() updateCountryDto: CountryCreateDto,
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.OK)
      .send(
        await this.countryService.update(id, updateCountryDto, request.user),
      );
  }

  @Delete(':id')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a country by Id' })
  @ApiParam({ name: 'id', description: 'Country id', type: 'number' })
  @ApiOkResponse({
    description: 'Empty response',
    type: null,
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    response.status(HttpStatus.OK).send(await this.countryService.delete(id));
  }

  @Get(':id/with-regions')
  @RolesGuard(UserRole.ALL)
  @ApiOperation({ summary: 'Get One country by Id with regions' })
  @ApiParam({ name: 'id', description: 'Country id', type: 'number' })
  @ApiOkResponse({
    description: 'Country item with regions',
    type: CountryItemDto,
    isArray: false,
  })
  async getOneByIdWithRegions(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.countryService.getOneByIdWithRegions(id));
  }

  @Get(':id/regions')
  @RolesGuard(UserRole.ALL)
  @ApiOperation({ summary: 'Get a country regions' })
  @ApiParam({ name: 'id', description: 'Country id', type: 'number' })
  @ApiOkResponse({
    description: 'List of regions',
    type: RegionItemDto,
    isArray: true,
  })
  async regions(
    @Param('id', ParseIntPipe) id: number,
    Request,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.regionService.getForCountry(id));
  }

  @Get(':id/locations')
  @RolesGuard(UserRole.ALL)
  @ApiOperation({ summary: 'Get a country locations' })
  @ApiParam({ name: 'id', description: 'Country id', type: 'number' })
  @ApiOkResponse({
    description: 'List of locations',
    type: LocationItemDto,
    isArray: true,
  })
  async locations(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.locationService.getForCountry(id));
  }
}
