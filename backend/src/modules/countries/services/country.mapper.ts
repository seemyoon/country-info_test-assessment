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
      commonName: data.commonName,
      officialName: data.officialName,
      countryCode: data.countryCode,
      region: data.region,
      flag: data?.flag,
      populationCounts: data?.populationCounts
        ? data.populationCounts.map((item) => ({
            year: item.year,
            value: item.value,
          }))
        : [],
      borders: data.borders
        ? data.borders.map((border) => ({
            commonName: border.commonName,
            countryCode: border.countryCode,
            officialName: border.officialName,
            region: border.region,
            borders: null,
          }))
        : [],
    };
  }

  public static toResDtoList(
    data: ShortCountryResDto[],
    total: number,
    query: CountryListReqDto,
  ): CountryListResDto {
    return {
      data: data.map((item) => CountryMapper.toShortResDto(item)),
      total,
      ...query,
    };
  }

  private static toShortResDto(data: any): ShortCountryResDto {
    return {
      countryCode: data.countryCode,
      name: data.name,
    };
  }
}
