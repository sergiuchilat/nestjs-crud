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
import { CountryService } from './country.service';

@Controller('/countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAll(@Res() response: Response) {
    response.status(HttpStatus.OK).json(await this.countryService.getAll());
  }

  @Get(':id')
  async getOneById(@Req() request: Request, @Res() response: Response) {
    try {
      const country = await this.countryService.getOneById(
        Number(request.params.id),
      );
      if (country) {
        response.status(HttpStatus.OK).send(country);
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
      const country = await this.countryService.create(request.body);
      if (country) {
        response.status(HttpStatus.OK).send(country);
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
      const country = await this.countryService.update(
        Number(request.params.id),
        request.body,
      );
      if (country) {
        response.status(HttpStatus.OK).send(country);
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
      const country = await this.countryService.getOneById(
        Number(request.params.id),
      );
      if (country) {
        await this.countryService.delete(Number(request.params.id));
        response.status(HttpStatus.OK).send({});
      } else {
        response.status(HttpStatus.NOT_FOUND).send();
      }
    } catch (e) {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).send(e);
    }
  }
}
