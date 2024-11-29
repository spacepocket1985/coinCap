import { useLocation } from 'react-router-dom';
import { PaginationControls } from '../components/paginationControls/PaginationControls';
import { checkPageNum } from '../utils/checkPageNum';
import { Container } from '@mui/material';

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
        <h2>Main, Page: {page}</h2>
        <PaginationControls currentPage={page} />
      </Container>
    </>
  );
};
