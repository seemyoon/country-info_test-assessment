import { IPopulationCounts } from './IPopulationCounts';

export interface ICountry{
  countryCode: string;
  commonName: string;
  officialName: string;
  flag: string;
  populationCounts: IPopulationCounts[];
  borderCountries: string[];
}