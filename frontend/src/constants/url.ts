const baseURL = 'http://localhost:3100/countries';

const urlBuilder = {
  allCountries: baseURL + '/AvailableCountries',
  getCountryByCountryCode: (countryCode: string) => baseURL + '/' + countryCode,
};
export { baseURL, urlBuilder };