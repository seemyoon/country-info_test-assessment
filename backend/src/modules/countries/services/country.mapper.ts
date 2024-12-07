import { Injectable } from '@nestjs/common';

import { Country } from '../../../database/entities/country.entity';
import { CountryListReqDto } from '../dto/req/list-countries.query.dto';
import { CountryResDto } from '../dto/res/country.res.dto';
import { CountryListResDto } from '../dto/res/country-list.res.dto';

@Injectable()
export class CountryMapper {
  public static toResDto(data: Country): CountryResDto {
    return {
      countryCode: data.countryCode,
      name: data.name,
      commonName: data.commonName,
      officialName: data.officialName,
      region: data.region,
      borders: data.borders?.map((border) => border.commonName) || [],
      populationData: data.populationData || [],
      flagUrl: data.flagUrl || '',
    };
  }

  public static toResDtoList(
    data: Country[],
    total: number,
    query: CountryListReqDto,
  ): CountryListResDto {
    return { data: data.map(this.toResDto), total, ...query };
  }
}
