import { PortfolioCurrencyType } from '../store/slices/portfolioSlice';

const savedQueriesStorageKey = 'savedPortfolioQueries';

export const getQueriesFromLS = (): PortfolioCurrencyType[] => {
  const storedData = localStorage.getItem(savedQueriesStorageKey);
  return storedData ? JSON.parse(storedData) : [];
};

export const saveQueriesToLS = (favorites: PortfolioCurrencyType[]): void => {
  localStorage.setItem(savedQueriesStorageKey, JSON.stringify(favorites));
};
