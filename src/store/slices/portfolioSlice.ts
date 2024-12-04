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
  portfolioDifference: string;
};

const initialState: PortfolioState = {
  portfolioCurrency: getQueriesFromLS(),
  portfolioTotal: getTotal(getQueriesFromLS()),
  portfolioDifference: '',
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    portfolioUpdateCurrency: (
      state,
      action: PayloadAction<PortfolioCurrencyType[]>
    ) => {
      state.portfolioDifference = (getTotal(action.payload) - state.portfolioTotal).toFixed(3)
      state.portfolioCurrency = action.payload;
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

export const { portfolioUpdateCurrency, reloadPortfolio } =
  portfolioSlice.actions;

export type ActionType = typeof portfolioSlice.actions;
