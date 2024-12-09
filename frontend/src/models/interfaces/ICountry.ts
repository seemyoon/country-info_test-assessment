import { IPopulationCounts } from './IPopulationCounts';
import { BorderCountriesResDto } from './IBorderCountries';

export interface ICountry{
  countryCode: string;
  commonName: string;
  officialName: string;
  flag: string | null;
  populationCounts: IPopulationCounts[];
  borders: BorderCountriesResDto[];
}