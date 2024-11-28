import { NumberOfCurrencies } from '../components/paginationControls/PaginationControls';

export const checkPaheNum = (pageParam: string | null): number => {
  const page =
    pageParam &&
    !isNaN(+pageParam) &&
    parseInt(pageParam) > 0 &&
    parseInt(pageParam) <= NumberOfCurrencies
      ? parseInt(pageParam)
      : 1;
  return page;
};
