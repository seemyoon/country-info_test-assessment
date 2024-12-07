import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CountryResDto {
  @ApiProperty({ description: 'The ISO code of the country' })
  countryCode: string;

  @ApiProperty({ description: 'The name of the country' })
  name: string;

  @ApiPropertyOptional({ description: 'Common name of the country' })
  commonName?: string;

  @ApiPropertyOptional({ description: 'Official name of the country' })
  officialName?: string;

  @ApiPropertyOptional({ description: 'Region where the country is located' })
  region?: string;

  @ApiProperty({
    description: 'List of bordering countries as ISO codes',
    type: [String],
  })
  borders: string[];

  @ApiProperty({
    description: 'Population data over time',
    type: [
      {
        year: { type: 'number' },
        value: { type: 'number' },
      },
    ],
  })
  populationData: { year: number; value: number }[];

  @ApiProperty({ description: 'URL of the country flag' })
  flagUrl: string;
}
