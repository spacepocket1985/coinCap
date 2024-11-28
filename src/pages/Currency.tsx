import { useParams } from 'react-router-dom';

export const Currency: React.FC = () => {
  const { currencyId } = useParams();
  return <h2>{`Currency - ${currencyId}`}</h2>;
};
