import { Injectable } from "@nestjs/common";

@Injectable()
export class CountryService{
  getAll(): string{
    return 'All countries';
  }
}