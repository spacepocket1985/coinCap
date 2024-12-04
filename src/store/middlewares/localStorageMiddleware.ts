import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { saveQueriesToLS } from '../../utils/localStorageActions';
import { AppRootState } from '../store';
import { AppActions } from '../types';

const localStorageMiddleware: Middleware<unknown, AppRootState> =
  (store) => (next) => (action) => {
    const result = next(action);

    if (
      (action as PayloadAction<AppActions>).type.startsWith(
        'portfolio/portfolio'
      )
    ) {
      const state = store.getState().portfolio.portfolioCurrency;
      saveQueriesToLS(state);
    }

    return result;
  };

export default localStorageMiddleware;
