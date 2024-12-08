import { createBrowserRouter, RouteObject } from 'react-router-dom';
import CountryMainLayout from '../layouts/CountryMainLayout';
import React from 'react';
import CountryPage from '../pages/CountryPage';
import CountryIdPage from '../pages/CountryIdPage';

const routes: RouteObject[] = [{
  path: '/', element: <CountryMainLayout />, children: [
    {
      index: true, element: <CountryPage />,
    },
    {
      path: '/:countryCode', element: <CountryIdPage />,
    },
  ],
}];

export const router = createBrowserRouter(routes);
export default router;