import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';

import { CountryListReqDto } from '../dto/req/list-countries.query.dto';
import { BorderCountryResDto } from '../dto/res/border-country.res.dto';
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

  public async getAvailableCountries(
    query: CountryListReqDto,
  ): Promise<[ShortCountryResDto[], number]> {
    try {
      const response: AxiosResponse<any> =
        await this.axiosInstanceDataNagerAt.get('/AvailableCountries');
      const countries: ShortCountryResDto[] = response.data.map((country) => ({
        countryCode: country.countryCode,
        name: country.name,
      }));

      const total = countries.length;
      const offset = query?.offset || 0;
      const limit = query?.limit || total;
      const paginatedCountries = countries.slice(offset, offset + limit);

      return [paginatedCountries, total];
    } catch (error) {
      this.logger.error('Error fetching available countries:', error);
      throw new NotFoundException('Unable to fetch countries data');
    }
  }

  public async getCountryInfo(
    countryCode: string,
  ): Promise<CountryApiResponse> {
    if (typeof countryCode !== 'string') {
      throw new ConflictException('Invalid country code provided');
    }

    const countryData = await this.getCountryDetails(countryCode);
    const populationData = await this.getPopulationData(countryCode);
    const flagData = await this.getFlagData(countryCode);

    if (countryData) {
      return {
        commonName: countryData.commonName,
        officialName: countryData.officialName,
        countryCode: countryData.countryCode,
        region: countryData.region,
        flag: flagData?.flag || null,
        populationCounts: populationData?.populationCounts,
        borders: countryData.borders,
      };
    } else {
      throw new NotFoundException('Country details not found');
    }
  }

  private async getCountryDetails(
    countryCode: string,
  ): Promise<BorderCountryResDto> {
    try {
      const response: AxiosResponse<any> =
        await this.axiosInstanceDataNagerAt.get(`/CountryInfo/${countryCode}`);

      if (!response || !response.data) {
        throw new NotFoundException(`Country ${countryCode} not found`);
      }

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
          borders: null,
        })),
      };
    } catch (error) {
      throw new NotFoundException(`Country ${countryCode} not foundasdasd`);
    }
  }

  private async getPopulationData(
    countryCode: string,
  ): Promise<{ populationCounts: { year: number; value: number }[] }> {
    try {
      const response: AxiosResponse<any> =
        await this.axiosInstanceDataNagerAt.get(`/CountryInfo/${countryCode}`);

      if (!response || !response.data) {
        throw new NotFoundException(`Country ${countryCode} not found`);
      }

      const countryData = response.data.commonName;

      const responsePopulation: AxiosResponse<any> =
        await this.axiosInstanceCountrySnowSpace.get('/countries/population');

      const populationData = responsePopulation.data.data;

      const country = populationData.find(
        (item: any) => item.country.toLowerCase() === countryData.toLowerCase(),
      );

      return { populationCounts: country ? country.populationCounts : null };
    } catch (error) {
      console.error('Error fetching population data:', error);
      throw new NotFoundException('Error fetching population data');
    }
  }

  private async getFlagData(countryCode: string): Promise<{ flag: string }> {
    try {
      const response: AxiosResponse<any> =
        await this.axiosInstanceDataNagerAt.get(`/CountryInfo/${countryCode}`);

      if (!response || !response.data) {
        throw new NotFoundException(`Country ${countryCode} not found`);
      }

      const countryData = response.data.commonName;

      const responseFlag: AxiosResponse<any> =
        await this.axiosInstanceCountrySnowSpace.get('/countries/flag/images');

      const flagData = responseFlag.data.data;

      const country = flagData.find((item: any) => item.name === countryData);

      return { flag: country ? country.flag : null };
    } catch (error) {
      console.error('Error fetching flag data:', error);
      throw new NotFoundException(
        `Error fetching flag data for ${countryCode}`,
      );
    }
  }
}
