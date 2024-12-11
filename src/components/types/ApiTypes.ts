import { PortfolioCurrencyType } from '../../store/slices/portfolioSlice';

export type ApiResponse<T> = {
  data: T;
};

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
  isChange: boolean;
  firstAddition: boolean;
};

export type CurrencyHistory = {
  priceUsd: string;
  time: number;
  date: string;
};

export type CryptoCurrencyHistoryType = {
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

export type ApiResponseCurrencies = ApiResponse<CryptoCurrencyType[]>;
export type ApiResponseCurrency = ApiResponse<CryptoCurrencyType>;
export type ApiResponseCurrencyHistory = ApiResponse<CurrencyHistory[]>;
export type ApiResponsePortfolio = ApiResponse<PortfolioCurrencyType[]>;
export type ApiResponseCurrencyPortfolio = ApiResponse<PortfolioCurrencyType>;
