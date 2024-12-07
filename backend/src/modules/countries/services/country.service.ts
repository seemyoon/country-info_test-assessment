import { Injectable, Logger } from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { BorderCountriesResDto } from '../dto/res/border-countries.res.dto';
import { CountryApiResponse } from '../dto/res/country.api.res.dto';
import { ShortCountryResDto } from '../dto/res/short-country.res.dto';

@Injectable()
export class CountriesService {
  private readonly logger = new Logger();
  private axiosInstanceDataNagerAt: AxiosInstance = axios.create({
    baseURL: 'https://date.nager.at/api/v3',
  });
  private axiosInstanceCountrySnowSpace: AxiosInstance = axios.create({
    baseURL: 'https://countriesnow.space/api/v0.1',
  });

  public async getAvailableCountries(): Promise<ShortCountryResDto[]> {
    try {
      const response: AxiosResponse<any> =
        await this.axiosInstanceDataNagerAt.get('/AvailableCountries');
      return response.data;
    } catch (error) {
      this.logger.error('Error fetching available countries:', error);
      throw error;
    }
  }

  public async getCountryInfo(
    countryCode: string,
  ): Promise<CountryApiResponse> {
    // const countryData = await this.getCountryDetails(countryCode);
    // const populationData = await this.getPopulationData(countryCode);
    // const flagData = await this.getFlagData(countryCode);
    //
    // let country = await this.countryRepository.findOne({
    //   where: { countryCode },
    // });
    //
    // if (!country) {
    //   country = new CountryEntity();
    //   country.countryCode = countryCode;
    // }
    //
    // country.name = countryData.name;
    // country.region = countryData.region;
    // country.flagUrl = flagData.flag;
    //
    // await this.countryRepository.save(country);
    //
    // for (const population of populationData) {
    //   const populationRecord = new PopulationDataEntity();
    //   populationRecord.year = population.year;
    //   populationRecord.value = population.value;
    //   populationRecord.country = country;
    //
    //   await this.populationDataRepository.save(populationRecord);
    // }

    return {} as CountryApiResponse;
  }

  private async getCountryDetails(
    countryCode: string,
  ): Promise<BorderCountriesResDto> {
    const response: AxiosResponse<any> =
      await this.axiosInstanceDataNagerAt.get(
        `/api/v3/CountryInfo/${countryCode}`,
      );

    const countryData = response.data;

    return {
      commonName: countryData.commonName || '',
      officialName: countryData.officialName || '',
      countryCode: countryData.countryCode || '',
      region: countryData.region || '',
      borders: (countryData.borders || []).map((border: any) => ({
        commonName: border.commonName || '',
        officialName: border.officialName || '',
        countryCode: border.countryCode || '',
        region: border.region || '',
      })),
    };
  }

  private async getPopulationData(
    countryCode: string,
  ): Promise<{ populationCounts: { year: number; value: number }[] }> {
    try {
      const response: AxiosResponse<any> =
        await this.axiosInstanceCountrySnowSpace.get('/countries/population');

      const country = response.data.data.find(
        (item: any) => item.iso3 === countryCode.toUpperCase(),
      );

      if (country) {
        return { populationCounts: country.populationCounts };
      }

      return { populationCounts: [] };
    } catch (error) {
      console.error('Error fetching population data:', error);
      return { populationCounts: [] };
    }
  }

  private async getFlagData(countryCode: string): Promise<{ flag: string }> {
    try {
      const response: AxiosResponse<any> =
        await this.axiosInstanceCountrySnowSpace.get('/countries/flag/images');

      const country = response.data.data.find(
        (item: any) =>
          item.iso2 === countryCode.toUpperCase() ||
          item.iso3 === countryCode.toUpperCase(),
      );

      if (country) {
        return { flag: country.data.flag };
      }
    } catch (error) {
      console.error('Error fetching flag data:', error);
    }
  }
}
