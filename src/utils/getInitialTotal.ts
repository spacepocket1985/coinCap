import { PortfolioCurrencyType } from '../store/slices/portfolioSlice';

export const getInitialTotal = (
  currencies: PortfolioCurrencyType[]
): number => {
  return currencies.reduce(
    (acc, item) => acc + item.initialPrice * item.count,
    0
  );
};
