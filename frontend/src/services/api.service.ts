import axios from 'axios';
import { baseURL, urlBuilder } from '../constants/url';

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
    const res = await axiosInstance.get(urlBuilder.allCountries, { params: { limit: 20, offset } });
    return res.data;
  },
  getCountryByCode: async (countryCode: string) => {
    return await axiosInstance.get(urlBuilder.getCountryByCountryCode(countryCode));
  },
};

export { countriesService };