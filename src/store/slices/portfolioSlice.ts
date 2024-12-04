import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getQueriesFromLS } from '../../utils/localStorageActions';
import { getTotal } from '../../utils/getTotal';

export type PortfolioCurrencyType = {
  id: string;
  name: string;
  priceUsd: number;
  count: number;
  total: number;
};
type PortfolioState = {
  portfolioCurrency: PortfolioCurrencyType[];
  portfolioTotal: number;
};

const initialState: PortfolioState = {
  portfolioCurrency: getQueriesFromLS(),
  portfolioTotal: getTotal(getQueriesFromLS()),
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    portfolioUpdateCurrency: (
      state,
      action: PayloadAction<PortfolioCurrencyType>
    ) => {
      const currencyIndex = state.portfolioCurrency.findIndex(
        (currency) => currency.id === action.payload.id
      );
      if (currencyIndex === -1) {
        state.portfolioCurrency.unshift(action.payload);
      } else {
        const currencyForUpdate = state.portfolioCurrency[currencyIndex];
        state.portfolioCurrency[currencyIndex] = {
          ...currencyForUpdate,
          count: currencyForUpdate.count + action.payload.count,
          total: currencyForUpdate.total + action.payload.total,
        };
      }
      state.portfolioTotal = getTotal(state.portfolioCurrency);
    },
    portfolioDeleteCurrency: (state, action: PayloadAction<string>) => {
      state.portfolioCurrency = state.portfolioCurrency.filter(
        (currency) => currency.id !== action.payload
      );
      state.portfolioTotal = getTotal(state.portfolioCurrency);
    },
    reloadPortfolio: (
      state,
      action: PayloadAction<PortfolioCurrencyType[]>
    ) => {
      state.portfolioCurrency = action.payload;
      state.portfolioTotal = getTotal(state.portfolioCurrency);
    },
  },
});

export default portfolioSlice.reducer;

export const {
  portfolioDeleteCurrency,
  portfolioUpdateCurrency,
  reloadPortfolio,
} = portfolioSlice.actions;

export type ActionType = typeof portfolioSlice.actions;
