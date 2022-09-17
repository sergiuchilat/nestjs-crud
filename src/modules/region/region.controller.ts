import {
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { RegionService } from './region.service';
import { LocationService } from '../location/location.service';

@Controller('/regions')
export class RegionController {
  constructor(
    private readonly regionService: RegionService,
    private readonly locationService: LocationService,
  ) {}

  @Get()
  async getAll(@Res() response: Response) {
    try {
      response.status(HttpStatus.OK).json(await this.regionService.getAll());
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Get(':id')
  async getOneById(@Req() request: Request, @Res() response: Response) {
    try {
      const region = await this.regionService.getOneById(
        Number(request.params.id),
      );
      if (region) {
        response.status(HttpStatus.OK).send(region);
      } else {
        response.status(HttpStatus.NOT_FOUND).send();
      }
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Post()
  async create(@Req() request: Request, @Res() response: Response) {
    try {
      const region = await this.regionService.create(request.body);
      if (region) {
        response.status(HttpStatus.OK).send(region);
      } else {
        response.status(HttpStatus.NOT_FOUND).send();
      }
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Patch(':id')
  async update(@Req() request: Request, @Res() response: Response) {
    try {
      const region = await this.regionService.update(
        Number(request.params.id),
        request.body,
      );
      if (region) {
        response.status(HttpStatus.OK).send(region);
      } else {
        response.status(HttpStatus.NOT_FOUND).send();
      }
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Delete(':id')
  async delete(@Req() request: Request, @Res() response: Response) {
    try {
      const region = await this.regionService.getOneById(
        Number(request.params.id),
      );
      if (region) {
        await this.regionService.delete(Number(request.params.id));
        response.status(HttpStatus.OK).send({});
      } else {
        response.status(HttpStatus.NOT_FOUND).send();
      }
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Get(':id/locations')
  async locations(@Req() request: Request, @Res() response: Response) {
    try {
      const locations = await this.locationService.getForRegion(
        Number(request.params.id),
      );
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
