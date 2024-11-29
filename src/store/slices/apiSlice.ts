import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CryptoСurrencyType } from '../../components/types/ApiTypes';

const BaseUrl = 'https://api.coincap.io/v2/assets';
const BaseLimit = 10;

export const coinCapApi = createApi({
  reducerPath: 'cryptoCurrencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (builder) => ({
    getCurrenciesList: builder.query<{ data: CryptoСurrencyType[] }, number>({
      query: (offset) => ({ url: `?limit=${BaseLimit}&offset=${offset}` }),
    }),
  }),
});

export const { useGetCurrenciesListQuery } = coinCapApi;
