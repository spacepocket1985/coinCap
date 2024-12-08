import { BaseLimit } from '../store/slices/apiSlice';

export const getCurrencyNumOnPage = (
  pageNum: number,
  currencyIndex: number
): number => BaseLimit * (pageNum - 1) + currencyIndex + 1;
