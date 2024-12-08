import { ApiProperty } from '@nestjs/swagger';

import { CountryListReqDto } from '../req/list-countries.query.dto';
import { ShortCountryResDto } from './short-country.res.dto';

export class CountryListResDto extends CountryListReqDto {
  @ApiProperty({
    description: 'List of countries',
    type: [ShortCountryResDto],
  })
  data: ShortCountryResDto[];

  @ApiProperty({ description: 'Total number of countries available' })
  total: number;
}
