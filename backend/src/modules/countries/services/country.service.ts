import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { Repository } from 'typeorm';

import { Country } from '../../../database/entities/country.entity';
import { CountryBorder } from '../../../database/entities/countryborder.entity';
import { PopulationData } from '../../../database/entities/populationdata.entity';

@Injectable()
export class CountriesService {
  constructor(
    @InjectRepository(Country)
    private countryRepository: Repository<Country>,
    @InjectRepository(CountryBorder)
    private countryBorderRepository: Repository<CountryBorder>,
    @InjectRepository(PopulationData)
    private populationDataRepository: Repository<PopulationData>,
    private readonly httpService: HttpService,
  ) {}

  public async getAvailableCountries(): Promise<Country[]> {
    const response: AxiosResponse<any> = await lastValueFrom(
      this.httpService.get('https://date.nager.at/api/v3/AvailableCountries'),
    );
    const countries = response.data;

    for (const countryData of countries) {
      const country = new Country();
      country.countryCode = countryData.iso2;
      country.name = countryData.name;
      country.flagUrl = `https://upload.wikimedia.org/wikipedia/commons/${countryData.iso2}.svg`; // Пример URL флага

      await this.countryRepository.save(country);
    }

    return countries;
  }

  public async getCountryInfo(countryCode: string): Promise<Country> {
    const countryData = await this.getCountryDetails(countryCode);
    const populationData = await this.getPopulationData(countryCode);
    const flagData = await this.getFlagData(countryCode);

    let country = await this.countryRepository.findOne({
      where: { countryCode },
    });

    if (!country) {
      country = new Country();
      country.countryCode = countryCode;
    }

    country.name = countryData.name;
    country.region = countryData.region;
    country.flagUrl = flagData.flag;

    await this.countryRepository.save(country);

    for (const population of populationData) {
      const populationRecord = new PopulationData();
      populationRecord.year = population.year;
      populationRecord.value = population.value;
      populationRecord.country = country;

      await this.populationDataRepository.save(populationRecord);
    }

    return country;
  }

  private async getCountryDetails(countryCode: string): Promise<any> {
    const response: AxiosResponse<any> = await lastValueFrom(
      this.httpService.get(
        `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
      ),
    );
    return response.data;
  }

  private async getPopulationData(countryCode: string): Promise<any[]> {
    const response: AxiosResponse<any> = await lastValueFrom(
      this.httpService.post(
        'https://countriesnow.space/api/v0.1/countries/population',
        {
          country: countryCode,
        },
      ),
    );
    return response.data.data?.populationCounts || [];
  }

  private async getFlagData(countryCode: string): Promise<any> {
    const response: AxiosResponse<any> = await lastValueFrom(
      this.httpService.post(
        'https://countriesnow.space/api/v0.1/countries/flag/images',
        {
          country: countryCode,
        },
      ),
    );
    return { flag: response.data.data?.flag || '' };
  }
}
