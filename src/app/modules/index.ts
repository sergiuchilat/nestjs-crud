import { CountryModule } from './geo/country/country.module';
import { RegionModule } from './geo/region/region.module';
import { LocationModule } from './geo/location/location.module';
import { AuthModule } from './auth/auth.module';

export default [AuthModule, CountryModule, RegionModule, LocationModule];
