import { BorderCountryResDto } from './border-country.res.dto';

export interface CountryApiResponse {
  countryCode: string;
  commonName?: string;
  officialName?: string;
  region?: string;
  borders?: BorderCountryResDto[];
  flag?: string;
  populationCounts?: { year: number; value: number }[];
}
