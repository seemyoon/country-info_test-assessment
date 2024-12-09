import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect, useState } from 'react';
import { countryActions } from '../../redux/countrySlice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';
import styles from './CountryIdPage.module.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CountryIdPage = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { country } = useAppSelector(state => state.CountrySliceState);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (params.countryCode) {
      setIsLoading(true);
      dispatch(countryActions.loadCountry(params.countryCode)).finally(() => {
        setIsLoading(false);
      });
    }
  }, [dispatch, params.countryCode]);

  if (isLoading) {
    return <div className={styles.loader}>Loading...</div>;
  }
  if (!country) {
    return <p>No data available for this country.</p>;
  }

  const populationData: ChartData<'line'> = {
    labels: country.populationCounts?.map(pc => pc.year) || [],
    datasets: [
      {
        label: 'Population',
        data: country.populationCounts?.map(pc => pc.value) || [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {country.flag && (
          <img src={country.flag} alt={`${country.commonName} flag`} className={styles.flag} />
        )}
        <h1 className={styles.countryName}>{country.officialName}</h1>
      </div>

      <div className={styles.info}>
        <p>
          <strong>Country Code:</strong> {country.countryCode}
        </p>
        {country.populationCounts?.length > 0 && (
          <p>
            <strong>Population in {country.populationCounts[country.populationCounts.length - 1].year}:</strong>{' '}
            {country.populationCounts[country.populationCounts.length - 1].value}
          </p>
        )}
      </div>

      {country.populationCounts?.length > 0 && (
        <div className={styles.chart}>
          <h2>Population Over Time</h2>
          <Line data={populationData} options={chartOptions} />
        </div>
      )}

      <div className={styles.borderCountries}>
        <h2>Border Countries</h2>
        {country.borders?.length > 0 ? (
          <ul className={styles.borderList}>
            {country.borders.map(border => (
              <li key={border.countryCode} className={styles.borderItem}>
                <a href={`/${border.countryCode}`} className={styles.borderLink}>
                  {border.officialName}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p>No border countries available.</p>
        )}
      </div>
    </div>
  );
};

export default CountryIdPage;
