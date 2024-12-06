import { PortfolioCurrencyType } from '../../store/slices/portfolioSlice';

export type CryptoCurrencyType = {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  supply: string;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
};

export type CurrencyHistory = {
  priceUsd: string;
  time: number;
  date: string;
};

export type ApiResponseCurrencies = {
  data: CryptoCurrencyType[];
};

export type ApiResponseCurrency = {
  data: CryptoCurrencyType;
};

export type ApiResponseCurrencyHistory = {
  data: CurrencyHistory[];
};

export type ApiResponsePortfolio = {
  data: PortfolioCurrencyType[];
};
