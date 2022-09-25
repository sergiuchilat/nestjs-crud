import { Like } from 'typeorm';
import { CountryFilters } from '../validators/country.filters.validator';

export default class CountryFiltersBuilder {
  private readonly filters: any = {};
  constructor(filters: CountryFilters) {
    if (filters && filters['name'] && filters['name'].length) {
      this.filters['name'] = Like(`%${filters['name']}%`);
    }

    if (filters && filters['code'] && filters['code'].length) {
      this.filters['code'] = Like(`%${filters['code']}%`);
    }
  }
  public get() {
    return this.filters;
  }
}
