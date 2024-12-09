import { Outlet } from 'react-router-dom';
import HeaderComponent from '../components/HeaderComponent/HeaderComponent';

const CountryMainLayout = () => {
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <Outlet></Outlet>
    </div>
  );
};

export default CountryMainLayout;