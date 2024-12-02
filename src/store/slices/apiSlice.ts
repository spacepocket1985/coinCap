import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ApiResponseCurrencies,
  ApiResponseCurrency,
} from '../../components/types/ApiTypes';

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
    }),
    getCurrency: builder.query<ApiResponseCurrency, string>({
      query: (id) => ({ url: `/${id}` }),
    }),
  }),
});

export const { useGetCurrenciesListQuery, useGetCurrencyQuery } = coinCapApi;
