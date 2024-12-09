import { createSlice } from '@reduxjs/toolkit';
import { loadCountries, loadCountry } from '../reducers/country.extra.reducers';
import { CountrySliceStateType } from '../models/types/CountrySliceStatetype';

const initialState: CountrySliceStateType = {
  countries: [],
  total: 0,
  country: null,
};

export const countrySlice = createSlice({
  name: 'countrySlice',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCountries.fulfilled, (state, action) => {
        state.countries = action.payload.data;
        state.total = action.payload.total;
      })
      .addCase(loadCountry.fulfilled, (state, action) => {
        state.country = action.payload;
      });
  },
});

export const countryActions = {
  ...countrySlice.actions,
  loadCountries,
  loadCountry,
};