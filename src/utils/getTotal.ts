import { PortfolioCurrencyType } from '../store/slices/portfolioSlice';

export const getTotal = (arr: PortfolioCurrencyType[]): number =>
  Number(arr.reduce((acc, item) => acc + item.total, 0).toFixed(3));
