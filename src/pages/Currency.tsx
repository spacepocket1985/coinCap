import { useParams } from 'react-router-dom';
import { useGetCurrencyQuery } from '../store/slices/apiSlice';
import { Container } from '@mui/material';
import { Spinner } from '../components/spinner/Spinner';
import { CurrencyPageItem } from '../components/currency/CurrencyPageItem';
import { CurrencyAddForm } from '../components/currency/CurrencyAddForm';

export const Currency: React.FC = () => {
  const { currencyId } = useParams();
  const { data: currency, isFetching: isFetchingCurency } = useGetCurrencyQuery(
    String(currencyId)
  );

  const contentOrSpinner = isFetchingCurency ? (
    <Spinner />
  ) : (
    <>
      <CurrencyAddForm currency={currency!.data} />
      <CurrencyPageItem currency={currency!.data} />
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
