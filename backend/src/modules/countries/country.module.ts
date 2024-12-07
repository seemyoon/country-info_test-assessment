import { Module } from '@nestjs/common';

import { CountriesController } from './controllers/countries.controller';
import { CountriesService } from './services/country.service';

@Module({
  controllers: [CountriesController],
  providers: [CountriesService],
})
export class CountryModule {}
