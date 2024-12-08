import { ICountries } from '../interfaces/ICountries';
import { ICountry } from '../interfaces/ICountry';

export type CountrySliceStateType = {
  countries: ICountries[],
  total: number,
  country: ICountry | null,
};