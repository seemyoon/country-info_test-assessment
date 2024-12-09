import axios from 'axios';
import { baseURL, urlBuilder } from '../constants/url';
import { ICountry } from '../models/interfaces/ICountry';
import { ICountriesResponse } from '../models/interfaces/ICountriesResponse';

const axiosInstance = axios.create({
  baseURL: baseURL,
  headers: {},
});
axiosInstance.interceptors.request.use(request => {
  request.headers.set('Content-Type', 'application/json');
  return request;
});

const countriesService = {
  getAllCountries: async (offset: string) => {
    const res = await axiosInstance.get<ICountriesResponse>(urlBuilder.allCountries, { params: { limit: 20, offset } });
    return res.data;
  },
  getCountryByCode: async (countryCode: string) => {
    const res = await axiosInstance.get<ICountry>(urlBuilder.getCountryByCountryCode(countryCode));
    console.log(res.data);
    return res.data;
  },
};

export { countriesService };