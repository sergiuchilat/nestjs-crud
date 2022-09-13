import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { CountryService } from './country.service';

@Controller('/countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get()
  async getAll(@Res() response: Response) {
    response.status(HttpStatus.OK).json(await this.countryService.getAll());
  }
}
