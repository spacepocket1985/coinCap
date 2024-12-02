import { useParams } from 'react-router-dom';
import { useGetCurrencyQuery } from '../store/slices/apiSlice';
import { Container } from '@mui/material';
import { Spinner } from '../components/spinner/Spinner';
import { CurrencyPageItem } from '../components/currency/CurrencyPageItem';

export const Currency: React.FC = () => {
  const { currencyId } = useParams();
  const { data: curency, isFetching: isFetchingCurency } = useGetCurrencyQuery(
    String(currencyId)
  );

  const contentOrSpinner = isFetchingCurency ? (
    <Spinner />
  ) : (
    <CurrencyPageItem currency={curency!.data} />
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
