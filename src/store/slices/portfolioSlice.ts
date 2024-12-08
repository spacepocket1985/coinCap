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

const DefaultPortfolioDifference = '0.000 (0.000 %)';

const initialState: PortfolioState = {
  portfolioCurrency: getQueriesFromLS(),
  portfolioTotal: getTotal(getQueriesFromLS()),
  portfolioDifference: DefaultPortfolioDifference,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    portfolioReload: (
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
        if (newTotal - oldTotal !== 0) {
          const difference = newTotal - oldTotal;

          const differencePercent = ((difference / oldTotal) * 100).toFixed(3);

          state.portfolioDifference = `${difference.toFixed(3)} (${differencePercent} %)`;
        }
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
          firstAddition: false,
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
        state.portfolioDifference = DefaultPortfolioDifference;
      if (state.portfolioCurrency.every((item) => !item.isChange))
        state.portfolioDifference = DefaultPortfolioDifference;
    },
  },
});

export default portfolioSlice.reducer;

export const {
  portfolioUpdateCurrency,
  portfolioReload,
  portfolioDeleteCurrency,
} = portfolioSlice.actions;

export type ActionType = typeof portfolioSlice.actions;
