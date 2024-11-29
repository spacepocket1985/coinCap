import { useLocation } from 'react-router-dom';
import { PaginationControls } from '../components/paginationControls/PaginationControls';
import { checkPageNum } from '../utils/checkPageNum';
import { Container } from '@mui/material';
import { CurrenciesList } from '../components/currency/CurrenciesList';
import { cryptoСurrenciesData } from '../components/types/ApiTypes';

export const Main: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageParam = query.get('page');
  const page = checkPageNum(pageParam);

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
        <CurrenciesList currencies={cryptoСurrenciesData} pageNum={page} />
        <PaginationControls currentPage={page} />
      </Container>
    </>
  );
};
