import { Equal, In, LessThanOrEqual, Like, MoreThanOrEqual } from 'typeorm';
import { CountryFilters } from '../validators/country.filters.validator';
import { isValidDate } from '../../../../utils/date';

export default class CountryFiltersBuilder {
  private readonly filters: any = {};
  constructor(filters: CountryFilters) {
    if (filters && filters['name'] && filters['name'].length) {
      this.filters['name'] = Like(`%${filters['name']}%`);
    }

    if (filters && filters['code'] && filters['code'].length) {
      this.filters['code'] = Equal(filters['code']);
    }

    if (filters && filters['created_from'] && filters['created_from'].length) {
      const date = new Date(filters['created_from']);
      if (isValidDate(date)) {
        this.filters['createdAt'] = MoreThanOrEqual(date);
      }
    }

    if (filters && filters['created_to'] && filters['created_to'].length) {
      const date = new Date(filters['created_from']);
      if (isValidDate(date)) {
        this.filters['createdAt'] = LessThanOrEqual(date);
      }
    }

    if (filters && filters['ids'] && filters['ids'].length) {
      const ids = filters['ids'].split(',').filter((id) => isFinite(id));
      if (ids.length) {
        this.filters['id'] = In(ids);
      }
    }

    if (filters && filters['codes'] && filters['codes'].length) {
      const codes = filters['codes'].split(',').map((code) => code.trim());
      if (codes.length) {
        this.filters['code'] = In(codes);
      }
    }
  }
  public get() {
    return this.filters;
  }
}
