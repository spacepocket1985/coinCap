import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CryptoCurrencyType,
  ApiResponse,
} from '../../components/types/ApiTypes';

const BaseUrl = 'https://api.coincap.io/v2/assets';
const BaseLimit = 10;

export const coinCapApi = createApi({
  reducerPath: 'cryptoCurrencyApi',
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl }),
  endpoints: (builder) => ({
    getCurrenciesList: builder.query<
      ApiResponse,
      { limit?: number; offset: number }
    >({
      query: ({ limit, offset }) => ({
        url: `?limit=${limit || BaseLimit}&offset=${offset}`,
      }),
      transformResponse: (response: ApiResponse) => {
        const transformedCurrencies: CryptoCurrencyType[] = response.data.map(
          (currency) => ({
            ...currency,
            marketCapUsd: (Number(currency.marketCapUsd) / 1e9).toFixed(3),
            volumeUsd24H: Number(currency.volumeUsd24Hr).toFixed(3),
            priceUsd: Number(currency.priceUsd).toFixed(3),
            changePercent24Hr: Number(currency.changePercent24Hr).toFixed(3),
            vwap24Hr: Number(currency.vwap24Hr).toFixed(3),
          })
        );
        return { data: transformedCurrencies };
      },
    }),
  }),
});

export const { useGetCurrenciesListQuery } = coinCapApi;
