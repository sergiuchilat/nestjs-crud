import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
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
import { Public } from '../../../decorators/public.decorator';
import { RolesGuard } from '../../user/roles/roles.decorator';
import { UserRole } from '../../user/roles/role.enum';

@ApiTags('Countries')
@Controller('/countries')
export class CountryController {
  constructor(
    private readonly countryService: CountryService,
    private readonly regionService: RegionService,
    private readonly locationService: LocationService,
  ) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'GET List of countries' })
  @ApiOkResponse({
    description: 'List of countries',
    type: CountryItemDto,
    isArray: true,
  })
  async getAll(@Res() response: Response) {
    try {
      response.status(HttpStatus.OK).json(await this.countryService.getAll());
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Get(':id')
  @RolesGuard(UserRole.ADMIN)
  @ApiOperation({ summary: 'GET One country by Id' })
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
    try {
      response
        .status(HttpStatus.OK)
        .send(await this.countryService.getOneById(id));
    } catch (e) {
      response.status(HttpStatus.NOT_FOUND).send(e);
    }
  }

  @Post()
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
    console.log(request);
    try {
      response
        .status(HttpStatus.OK)
        .send(await this.countryService.create(createCountryDto));
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Patch(':id')
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
    @Res() response: Response,
  ) {
    try {
      response
        .status(HttpStatus.OK)
        .send(await this.countryService.update(id, updateCountryDto));
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Delete(':id')
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
    try {
      const country = await this.countryService.getOneById(id);
      if (country) {
        await this.countryService.delete(id);
        response.status(HttpStatus.OK).send({});
      } else {
        response.status(HttpStatus.NOT_FOUND).send();
      }
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Get(':id/with-regions')
  @ApiOperation({ summary: 'GET One country by Id with regions' })
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
    try {
      response
        .status(HttpStatus.OK)
        .send(await this.countryService.getOneByIdWithRegions(id));
    } catch (e) {
      response.status(HttpStatus.NOT_FOUND).send(e);
    }
  }

  @Get(':id/regions')
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
    try {
      const regions = await this.regionService.getForCountry(id);
      if (regions) {
        response.status(HttpStatus.OK).send(regions);
      } else {
        response.status(HttpStatus.NOT_FOUND).send();
      }
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Get(':id/locations')
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
    try {
      const locations = await this.locationService.getForCountry(id);
      if (locations) {
        response.status(HttpStatus.OK).send(locations);
      } else {
        response.status(HttpStatus.NOT_FOUND).send();
      }
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }
}
