import { Controller, Get } from "@nestjs/common";
import { CountryService } from './country.service';

@Controller('countries')

export class CountryController{
  constructor (private readonly countryService: CountryService) {}

  @Get()
  getAll(): string {
    return this.countryService.getAll();
  }
}