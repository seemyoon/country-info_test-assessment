import { ICountries } from '../../models/interfaces/ICountries';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './CountryListComponent.module.css';

interface IProps {
  country: ICountries;
}

export const CountryListComponent: FC<IProps> = ({ country }) => {
  return (
    <div className={styles.countryItem}>
      <Link to={`/${country.countryCode}`} className={styles.countryLink}>
        <h2 className={styles.countryName}>{country.name}</h2>
      </Link>
    </div>
  );
};