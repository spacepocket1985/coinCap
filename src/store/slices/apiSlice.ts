import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ApiResponseCurrencies,
  ApiResponseCurrency,
  ApiResponseCurrencyHistory,
  ApiResponseCurrencyPortfolio,
  ApiResponsePortfolio,
  CryptoCurrencyType,
} from '../../components/types/ApiTypes';
import { currentDateMs, sevenDaysAgoMs } from '../../utils/getUnixTimeStamp';
import { PortfolioCurrencyType } from './portfolioSlice';

const BaseUrl = 'https://api.coincap.io/v2/assets';
const BaseLimit = 10;

export const coinCapApi = createApi({
  reducerPath: 'cryptoCurrencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  tagTypes: ['Currency'],
  endpoints: (builder) => ({
    getCurrenciesList: builder.query<
      ApiResponsePortfolio,
      { limit?: number; offset: number }
    >({
      query: ({ limit, offset }) => ({
        url: `?limit=${limit || BaseLimit}&offset=${offset}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Currency' as const,
                id,
              })),
              { type: 'Currency', id: 'LIST' },
            ]
          : [{ type: 'Currency', id: 'LIST' }],
      transformResponse: (response: ApiResponseCurrencies) => {
        const transformedCurrencies: PortfolioCurrencyType[] =
          response.data.map((currency) => transformCurrency(currency));
        return { data: transformedCurrencies };
      },
    }),
    getCurrenciesByIds: builder.query<ApiResponsePortfolio, string>({
      query: (ids) => ({ url: `?ids=${ids}` }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({
                type: 'Currency' as const,
                id,
              })),
              { type: 'Currency', id: 'LIST' },
            ]
          : [{ type: 'Currency', id: 'LIST' }],
      transformResponse: (response: ApiResponseCurrencies) => {
        const transformedCurrencies: PortfolioCurrencyType[] =
          response.data.map((currency) => transformCurrency(currency));
        return { data: transformedCurrencies };
      },
    }),
    getCurrency: builder.query<ApiResponseCurrencyPortfolio, string>({
      query: (id) => ({ url: `/${id}` }),
      transformResponse: (response: ApiResponseCurrency) => {
        return { data: transformCurrency(response.data) };
      },
    }),
    getCurrencyHistory: builder.query<ApiResponseCurrencyHistory, string>({
      query: (id) => ({
        url: `${id}/history?interval=d1&start=${currentDateMs}&end=${sevenDaysAgoMs}`,
      }),
      transformResponse: (response: ApiResponseCurrencyHistory) => {
        const transformData = response.data.map((item) => ({
          ...item,
          priceUsd: Number(item.priceUsd).toFixed(2),
          date: item.date.slice(0, 10),
        }));
        return { data: transformData };
      },
    }),
  }),
});

const transformCurrency = (currency: CryptoCurrencyType) => ({
  ...currency,
  marketCapUsd: (Number(currency.marketCapUsd) / 1e9).toFixed(2),
  volumeUsd24H: Number(currency.volumeUsd24Hr).toFixed(2),
  priceUsd: Number(currency.priceUsd).toFixed(2),
  changePercent24Hr: Number(currency.changePercent24Hr).toFixed(2),
  vwap24Hr: Number(currency.vwap24Hr).toFixed(2),
  maxSupply: Number(currency.maxSupply).toFixed(2),
  supply: Number(currency.supply).toFixed(2),
  count: 0,
  total: 0,
});

export const {
  useGetCurrenciesListQuery,
  useGetCurrencyQuery,
  useGetCurrencyHistoryQuery,
  useGetCurrenciesByIdsQuery,
} = coinCapApi;
