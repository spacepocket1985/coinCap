import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ApiResponseCurrencies,
  ApiResponseCurrency,
  ApiResponseCurrencyHistory,
  CryptoCurrencyType,
} from '../../components/types/ApiTypes';
import { currentDateMs, sevenDaysAgoMs } from '../../utils/getUnixTimestamp';

const BaseUrl = 'https://api.coincap.io/v2/assets';
const BaseLimit = 10;

export const coinCapApi = createApi({
  reducerPath: 'cryptoCurrencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (builder) => ({
    getCurrenciesList: builder.query<
      ApiResponseCurrencies,
      { limit?: number; offset: number }
    >({
      query: ({ limit, offset }) => ({
        url: `?limit=${limit || BaseLimit}&offset=${offset}`,
      }),
      transformResponse: (response: ApiResponseCurrencies) => {
        const transformedCurrencies: CryptoCurrencyType[] = response.data.map(
          (currency) => transformCurrency(currency)
        );
        return { data: transformedCurrencies };
      },
    }),
    getCurrency: builder.query<ApiResponseCurrency, string>({
      query: (id) => ({ url: `/${id}` }),
      transformResponse: (response: ApiResponseCurrency) => {
        return { data: transformCurrency(response.data) };
      },
    }),
    getCurrencyHistory: builder.query<ApiResponseCurrencyHistory, string>({
      query: (id) => ({
        url: `${id}/history?interval=d1&start=${currentDateMs}&end=${sevenDaysAgoMs} `,
      }),
      transformResponse: (response: ApiResponseCurrencyHistory) => {
        const transformData = response.data.map((item) => ({
          ...item,
          priceUsd: Number(item.priceUsd).toFixed(3),
          date: item.date.slice(0, 10),
        }));
        return { data: transformData };
      },
    }),
  }),
});

const transformCurrency = (currency: CryptoCurrencyType) => ({
  ...currency,
  marketCapUsd: (Number(currency.marketCapUsd) / 1e9).toFixed(3),
  volumeUsd24H: Number(currency.volumeUsd24Hr).toFixed(3),
  priceUsd: Number(currency.priceUsd).toFixed(3),
  changePercent24Hr: Number(currency.changePercent24Hr).toFixed(3),
  vwap24Hr: Number(currency.vwap24Hr).toFixed(3),
  maxSupply: Number(currency.maxSupply).toFixed(3),
  supply: Number(currency.supply).toFixed(3),
  volumeUsd24Hr: Number(currency.volumeUsd24Hr).toFixed(3),
});

export const {
  useGetCurrenciesListQuery,
  useGetCurrencyQuery,
  useGetCurrencyHistoryQuery,
} = coinCapApi;
