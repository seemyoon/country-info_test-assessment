import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { countryActions } from '../../redux/countrySlice';
import { CountryListComponent } from '../../components/CountryListComponent/CoutryListComponent';
import PaginationComponent from '../../components/PaginationComponent';
import styles from './CountryPage.module.css';

const CountryPage = () => {
  const dispatch = useAppDispatch();
  const { countries, total } = useAppSelector(state => state.CountrySliceState);
  const [searchParams] = useSearchParams();
  const queryOffset = searchParams.get('offset');

  useEffect(() => {
    dispatch(countryActions.loadCountries(queryOffset || '0'));
  }, [dispatch, queryOffset]);

  return (
    <section className={styles.section}>
      <div className={styles.countriesContainer}>
        {countries.map(country => (
          <CountryListComponent key={country.countryCode} country={country} />
        ))}
      </div>
      <div className={styles.pagination}>
        <PaginationComponent count={total} />
      </div>
    </section>
  );
};

export default CountryPage;