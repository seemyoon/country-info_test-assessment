import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CountryListReqDto } from '../dto/req/list-countries.query.dto';
import { CountryResDto } from '../dto/res/country.res.dto';
import { CountryListResDto } from '../dto/res/country-list.res.dto';
import { CountryMapper } from '../services/country.mapper';
import { CountriesService } from '../services/country.service';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('available-countries')
  public async getAvailableCountries(
    @Query() query: CountryListReqDto,
  ): Promise<CountryListResDto> {
    const countries = await this.countriesService.getAvailableCountries();
    const total = countries.length;
    return CountryMapper.toResDtoList(countries, total, query);
  }

  @Get(':countryCode')
  public async getCountryInfo(
    @Param('countryCode') countryCode: string,
  ): Promise<CountryResDto> {
    const countryInfo = await this.countriesService.getCountryInfo(countryCode);
    return CountryMapper.toResDto(countryInfo);
  }
}
