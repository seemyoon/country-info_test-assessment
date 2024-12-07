export interface CountryApiResponse {
  countryCode: string;
  name: string;
  commonName?: string;
  officialName?: string;
  region?: string;
  borders?: { countryCode: string; commonName: string; officialName: string }[];
  flag?: string;
  populationCounts?: { year: number; value: number }[];
}
