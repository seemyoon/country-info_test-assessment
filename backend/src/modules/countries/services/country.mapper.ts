import { Injectable } from '@nestjs/common';

import { CountryListReqDto } from '../dto/req/list-countries.query.dto';
import { CountryApiResponse } from '../dto/res/country.api.res.dto';
import { CountryListResDto } from '../dto/res/country-list.res.dto';
import { FullInfoCountryResDto } from '../dto/res/full-info-country.res.dto';
import { ShortCountryResDto } from '../dto/res/short-country.res.dto';

@Injectable()
export class CountryMapper {
  public static toFullInfoDto(data: CountryApiResponse): FullInfoCountryResDto {
    return {
      countryCode: data.countryCode,
      commonName: data.commonName || '',
      officialName: data.officialName || '',
      region: data.region || '',
      flag: data.flag || '',
      populationCounts: data.populationCounts || [],
      borders: data.borders
        ? data.borders.map((border) => border.countryCode)
        : [],
    };
  }

  public static toShortResDto(data: any): ShortCountryResDto {
    return {
      countryCode: data.countryCode,
      name: data.name,
    };
  }

  public static toResDtoList(
    data: any[],
    total: number,
    query: CountryListReqDto,
  ): CountryListResDto {
    return {
      data: data.map((item) => CountryMapper.toShortResDto(item)),
      total,
      ...query,
    };
  }
}
