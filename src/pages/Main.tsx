import { useLocation } from 'react-router-dom';
import { PaginationControls } from '../components/paginationControls/PaginationControls';
import { checkPaheNum } from '../utils/checkPaheNum';

export const Main: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageParam = query.get('page');
  const page = checkPaheNum(pageParam);

  return (
    <>
      <h2>Main, Page: {page}</h2>
      <PaginationControls currentPage={page} />
    </>
  );
};
