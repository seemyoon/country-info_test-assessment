import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { countriesService } from '../src/services/api.service';

export const loadCountries = createAsyncThunk(
  'countriesSlice/loadCountries',
  async (offset: string, thunkAPI) => {
    try {
      const resp = await countriesService.getAllCountries(offset);
      return thunkAPI.fulfillWithValue(resp);
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }

  },
);

export const loadCountry = createAsyncThunk(
  'countrySlice/loadCountry',
  async (countryCode: string, thunkAPI) => {
    try {
      const resp = await countriesService.getCountryByCode(countryCode);
      return thunkAPI.fulfillWithValue(resp);
    } catch (error) {
      const axiosError = error as AxiosError;
      return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  },
);
