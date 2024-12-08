import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CountryListReqDto } from '../dto/req/list-countries.query.dto';
import { CountryListResDto } from '../dto/res/country-list.res.dto';
import { FullInfoCountryResDto } from '../dto/res/full-info-country.res.dto';
import { CountryMapper } from '../services/country.mapper';
import { CountriesService } from '../services/country.service';

@ApiTags('Countries')
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('AvailableCountries')
  public async getAvailableCountries(
    @Query() query: CountryListReqDto,
  ): Promise<CountryListResDto> {
    const [countries, total] =
      await this.countriesService.getAvailableCountries(query);
    return CountryMapper.toResDtoList(countries, total, query);
  }

  @Get(':countryCode')
  public async getCountryInfo(
    @Param('countryCode') countryCode: string,
  ): Promise<FullInfoCountryResDto> {
    const countryDetails =
      await this.countriesService.getCountryInfo(countryCode);
    return CountryMapper.toFullInfoDto(countryDetails);
  }
}
