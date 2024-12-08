const baseURL = 'http://localhost:3100/countries';

const urlBuilder = {
  allCountries: baseURL + '/AvailableCountries',
  getCountryByCountryCode: (countryCode: string) => baseURL + countryCode,
  //http://localhost:3100/countries/AvailableCountries?limit=20&offset=10'
};
export { baseURL, urlBuilder };