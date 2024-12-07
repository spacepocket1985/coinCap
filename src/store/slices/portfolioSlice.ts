import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getQueriesFromLS } from '../../utils/localStorageActions';
import { getTotal } from '../../utils/getTotal';
import { CryptoCurrencyType } from '../../components/types/ApiTypes';

export type PortfolioCurrencyType = CryptoCurrencyType & {
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
  portfolioDifference: '0.00 (0.00 %)',
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    reloadPortfolio: (
      state,
      action: PayloadAction<{
        currencies: PortfolioCurrencyType[];
        isDifference: boolean;
      }>
    ) => {
      const newTotal = getTotal(action.payload.currencies);
      const oldTotal = getTotal(state.portfolioCurrency);
      state.portfolioCurrency = action.payload.currencies;
      state.portfolioTotal = newTotal;

      if (action.payload.isDifference) {
        const difference = newTotal - oldTotal;

        let differencePercent = '0.00';

        differencePercent = ((difference / oldTotal) * 100).toFixed(2);

        state.portfolioDifference = `${difference.toFixed(2)} (${differencePercent} %)`;
      } else {
        state.portfolioDifference = '0.00 (0.00 %)';
      }
    },

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
      if (state.portfolioCurrency.length === 0)
        state.portfolioDifference = '0.00 (0.00 %)';
    },
  },
});

export default portfolioSlice.reducer;

export const {
  portfolioUpdateCurrency,
  reloadPortfolio,
  portfolioDeleteCurrency,
} = portfolioSlice.actions;

export type ActionType = typeof portfolioSlice.actions;
