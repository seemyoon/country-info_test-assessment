import { BorderCountriesResDto } from './border-countries.res.dto';
import { PopulationCountsResDto } from './population.counts.res.dto';

export class FullInfoCountryResDto extends BorderCountriesResDto {
  flag: string | null;
  populationCounts: PopulationCountsResDto[];
}
