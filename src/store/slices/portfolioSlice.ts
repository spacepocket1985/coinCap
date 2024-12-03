import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  portfolioCurrency: [],
  portfolioTotal: 0,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updatePortfolioCurrency: (
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
      state.portfolioTotal = state.portfolioCurrency.reduce(
        (acc, item) => acc + item.total,
        0
      );
    },
    deletePortfolioCurrency: (state, action: PayloadAction<string>) => {
      state.portfolioCurrency = state.portfolioCurrency.filter(
        (currency) => currency.id !== action.payload
      );
      state.portfolioTotal = state.portfolioCurrency.reduce(
        (acc, item) => acc + item.total,
        0
      );
    },
  },
});

export default portfolioSlice.reducer;

export const { deletePortfolioCurrency, updatePortfolioCurrency } =
  portfolioSlice.actions;
