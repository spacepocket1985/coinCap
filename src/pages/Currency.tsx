import { useParams } from 'react-router-dom';
import { useGetCurrencyQuery } from '../store/slices/apiSlice';
import { Container } from '@mui/material';
import { Spinner } from '../components/spinner/Spinner';

export const Currency: React.FC = () => {
  const { currencyId } = useParams();
  const { data: curency, isFetching: isFetchingCurency } = useGetCurrencyQuery(
    String(currencyId)
  );

  const contentOrSpinner = isFetchingCurency ? (
    <Spinner />
  ) : (
    <>
      <div>{curency!.data.name}</div>
      <div>{curency!.data.maxSupply}</div>
      <div>{curency!.data.priceUsd}</div>
    </>
  );
  return (
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
  );
};
