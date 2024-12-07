import { ApiProperty } from '@nestjs/swagger';
import { CountryResDto } from './country.res.dto';

export class CountryListResDto {
  @ApiProperty({
    description: 'List of countries',
    type: [CountryResDto],
  })
  data: CountryResDto[];

  @ApiProperty({ description: 'Total number of countries available' })
  total: number;
}
