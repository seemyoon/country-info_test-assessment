import { ApiProperty } from '@nestjs/swagger';

import { ShortCountryResDto } from './short-country.res.dto';

export class CountryListResDto {
  @ApiProperty({
    description: 'List of countries',
    type: [ShortCountryResDto],
  })
  data: ShortCountryResDto[];

  @ApiProperty({ description: 'Total number of countries available' })
  total: number;
}
