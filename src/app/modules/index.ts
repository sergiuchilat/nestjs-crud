import { CountryModule } from './geo/country/country.module';
import { RegionModule } from './geo/region/region.module';
import { LocationModule } from './geo/location/location.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

export default [
  AuthModule,
  UserModule,
  CountryModule,
  RegionModule,
  LocationModule,
  CompanyModule,
];
