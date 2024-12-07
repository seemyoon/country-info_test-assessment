import { ApiProperty } from '@nestjs/swagger';

import { CountryResDto } from '../res/country.res.dto';

export class CountryListReqDto {
  @ApiProperty({
    description: 'List of countries',
    type: [CountryResDto],
  })
  data: CountryResDto[];

  @ApiProperty({ description: 'Total number of countries available' })
  total: number;
}
