import { Currency } from '../pages/Currency';
import { Main } from '../pages/Main';
import { NotFound } from '../pages/NotFound';
import { RoutePaths } from './routePaths';

export const publicRoutes = [
  {
    path: RoutePaths.Main,
    Page: Main,
  },
  {
    path: RoutePaths.Currency,
    Page: Currency,
  },

  {
    path: RoutePaths.PAGE404,
    Page: NotFound,
  },
];
