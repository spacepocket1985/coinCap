import { lazy } from 'react';

import { NotFound } from '../pages/NotFound';
import { RoutePaths } from './routePaths';

const LazyMain = lazy(() => import('../pages/Main'));
const LazyCurrency = lazy(() => import('../pages/Currency'));

export const publicRoutes = [
  {
    path: RoutePaths.Main,
    Page: LazyMain,
  },
  {
    path: RoutePaths.Currency,
    Page: LazyCurrency,
  },

  {
    path: RoutePaths.PAGE404,
    Page: NotFound,
  },
];
