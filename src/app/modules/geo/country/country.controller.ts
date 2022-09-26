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
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CountryService } from './country.service';
import { RegionService } from '../region/region.service';
import { LocationService } from '../location/location.service';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CountryCreateDto } from './dto/country.create.dto';
import { CountryItemDto } from './dto/country.item.dto';
import { LocationItemDto } from '../location/dto/location.item.dto';
import { RegionItemDto } from '../region/dto/region.item.dto';
import { RolesGuard } from '../../user/roles/roles.decorator';
import { UserRole } from '../../user/roles/role.enum';
import ConfigPagination from '../../../../config/config.pagination';
import { SortOrder } from '../../../validators/typeorm.sort.validator';
import { CountrySort } from './validators/country.sort.validator';
import { TimeoutInterceptor } from '../../../interceptors/timeout.interceptor';

@ApiTags('Countries')
@Controller('/countries')
@ApiBearerAuth('jwt')
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
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Page size',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'sort_order',
    description: 'Sort order',
    enum: SortOrder,
    required: false,
  })
  @ApiQuery({
    name: 'sort_by',
    description: 'Sort column',
    enum: CountrySort,
    required: false,
  })
  @ApiQuery({
    name: 'filter[name]',
    description: 'Filter by name',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'filter[code]',
    description: 'Filter by code',
    type: 'string',
    required: false,
  })
  @ApiOkResponse({
    description: 'List of countries',
    type: CountryItemDto,
    isArray: true,
  })
  @UseInterceptors(TimeoutInterceptor)
  async getAllPaginated(
    @Query('page', new DefaultValuePipe(ConfigPagination.page), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(ConfigPagination.limit), ParseIntPipe)
    limit: number,
    @Query('sort_order', new DefaultValuePipe(SortOrder.DESC))
    sort_order: SortOrder,
    @Query('sort_by', new DefaultValuePipe(CountrySort.id))
    sort_by: CountrySort,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    response.status(HttpStatus.OK).json(
      await this.countryService.getAllPaginated(
        {
          page,
          limit,
        },
        sort_order,
        sort_by,
        request.query.filter,
      ),
    );
  }

  @Get('with-deleted')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get list of countries' })
  @ApiQuery({
    name: 'page',
    description: 'Page number',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'limit',
    description: 'Page size',
    type: 'number',
    required: false,
  })
  @ApiQuery({
    name: 'sort_order',
    description: 'Sort order',
    enum: SortOrder,
    required: false,
  })
  @ApiQuery({
    name: 'sort_by',
    description: 'Sort column',
    enum: CountrySort,
    required: false,
  })
  @ApiQuery({
    name: 'filter[name]',
    description: 'Filter by name',
    type: 'string',
    required: false,
  })
  @ApiQuery({
    name: 'filter[code]',
    description: 'Filter by code',
    type: 'string',
    required: false,
  })
  @ApiOkResponse({
    description: 'List of countries',
    type: CountryItemDto,
    isArray: true,
  })
  @UseInterceptors(TimeoutInterceptor)
  async getAllWithDeleted(
    @Query('page', new DefaultValuePipe(ConfigPagination.page), ParseIntPipe)
    page: number,
    @Query('limit', new DefaultValuePipe(ConfigPagination.limit), ParseIntPipe)
    limit: number,
    @Query('sort_order', new DefaultValuePipe(SortOrder.DESC))
    sort_order: SortOrder,
    @Query('sort_by', new DefaultValuePipe(CountrySort.id))
    sort_by: CountrySort,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    response.status(HttpStatus.OK).json(
      await this.countryService.getAllWithDeleted(
        {
          page,
          limit,
        },
        sort_order,
        sort_by,
        request.query.filter,
      ),
    );
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
  @ApiOperation({ summary: 'Soft Delete a country by Id' })
  @ApiParam({ name: 'id', description: 'Country id', type: 'number' })
  @ApiOkResponse({
    description: 'Empty response',
    type: null,
  })
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    response
      .status(HttpStatus.OK)
      .send(await this.countryService.deleteSoft(id, request.user));
  }

  @Delete(':id/destroy')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete(complete) a country by Id' })
  @ApiParam({ name: 'id', description: 'Country id', type: 'number' })
  @ApiOkResponse({
    description: 'Empty response',
    type: null,
  })
  async destroy(
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
