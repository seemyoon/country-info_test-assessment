import { ICountries } from '../models/interfaces/ICountries';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  country: ICountries;
}

export const CountryListComponent: FC<IProps> = ({ country }) => {
  return (
    <div>
      <Link to={'/countries/' + country.countryCode}>
        <h1>{country.name}</h1>
      </Link>
    </div>
  );
};