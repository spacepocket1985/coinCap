import { useLocation } from 'react-router-dom';

export const Main: React.FC = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const pageParam = query.get('page');
  const page = pageParam ? parseInt(pageParam) : 1;

  return <h2>Main, Page: {page}</h2>;
};
