import { ApiProperty } from '@nestjs/swagger';

export class ShortCountryResDto {
  @ApiProperty({ description: 'The ISO code of the country' })
  countryCode: string;

  @ApiProperty({ description: 'The name of the country' })
  name: string;
}
