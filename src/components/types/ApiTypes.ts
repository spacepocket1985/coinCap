export type CryptoCurrencyType = {
  id: string;
  rank: number;
  symbol: string;
  name: string;
  supply: number;
  maxSupply: string;
  marketCapUsd: string;
  volumeUsd24Hr: string;
  priceUsd: string;
  changePercent24Hr: string;
  vwap24Hr: string;
  explorer: string;
};

export type ApiResponseCurrencies = {
  data: CryptoCurrencyType[];
};

export type ApiResponseCurrency = {
  data: CryptoCurrencyType;
};
