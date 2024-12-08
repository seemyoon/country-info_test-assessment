import { useAppDispatch, useAppSelector } from '../redux/store';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { countryActions } from '../redux/countrySlice';
import { CountryListComponent } from '../components/CoutryListComponent';
import PaginationComponent from '../components/PaginationComponent';

const CountryPage = () => {
  const dispatch = useAppDispatch();
  const { countries, total } = useAppSelector(state => state.CountrySliceState);
  const [searchParams] = useSearchParams();
  const queryOffset = searchParams.get('offset');

  useEffect(() => {
    dispatch(countryActions.loadCountries(queryOffset || '0'));
  }, [dispatch, queryOffset]);

  return (<section>
      <div>
        {countries.map(country => <CountryListComponent key={country.countryCode} country={country} />)}
      </div>
      <PaginationComponent count={total} />
    </section>

  );
};

export default CountryPage;