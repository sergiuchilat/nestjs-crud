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
import { LocationService } from './location.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Locations')
@Controller('/locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get()
  async getAll(@Res() response: Response) {
    try {
      response.status(HttpStatus.OK).json(await this.locationService.getAll());
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }

  @Get(':id')
  async getOneById(@Req() request: Request, @Res() response: Response) {
    try {
      const region = await this.locationService.getOneById(
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
      const region = await this.locationService.create(request.body);
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
      const region = await this.locationService.update(
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
      const region = await this.locationService.getOneById(
        Number(request.params.id),
      );
      if (region) {
        await this.locationService.delete(Number(request.params.id));
        response.status(HttpStatus.OK).send({});
      } else {
        response.status(HttpStatus.NOT_FOUND).send();
      }
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }
}
