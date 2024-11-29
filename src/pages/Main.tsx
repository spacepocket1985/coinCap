import { useLocation } from 'react-router-dom';
import { PaginationControls } from '../components/paginationControls/PaginationControls';
import { checkPageNum } from '../utils/checkPageNum';
import { Container } from '@mui/material';
import { CurrenciesList } from '../components/currency/CurrenciesList';
import { useGetCurrenciesListQuery } from '../store/slices/apiSlice';
import { Spinner } from '../components/spinner/Spinner';

export const Main: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageParam = query.get('page');
  const page = checkPageNum(pageParam);

  const queryOffset = page === 1 ? 0 : page * 10;
  const { data: currencies, isFetching } =
    useGetCurrenciesListQuery(queryOffset);

  const contentOrSpinner = isFetching ? (
    <Spinner />
  ) : (
    <>  
      <CurrenciesList pageNum={page} currencies={currencies!.data} />
      <PaginationControls currentPage={page} />
    </>
  );

  return (
    <>
      <Container
        sx={{
          mt: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        {contentOrSpinner}
      </Container>
    </>
  );
};
