import { useParams } from 'react-router-dom';
import { useGetCurrencyQuery } from '../store/slices/apiSlice';
import { Container, Typography } from '@mui/material';
import { Spinner } from '../components/spinner/Spinner';
import { CurrencyPageItem } from '../components/currency/CurrencyPageItem';
import { CurrencyAddForm } from '../components/currency/CurrencyAddForm';
import { CurrencyHistory } from '../components/currency/CurrencyHistory';
import { BtnGoMain, BtnGoMainType } from '../components/ui/BtnGoMain';

export const Currency: React.FC = () => {
  const { currencyId } = useParams();
  const { data: currency, isFetching: isFetchingCurrency } =
    useGetCurrencyQuery(String(currencyId));

  const contentOrSpinner = isFetchingCurrency ? (
    <Spinner />
  ) : currency && currency.data ? (
    <>
      <CurrencyAddForm currency={currency.data} />
      <CurrencyPageItem currency={currency.data} />
      <CurrencyHistory currencyId={currency.data.id} />
      <BtnGoMain type={BtnGoMainType.Button}>{'go back'}</BtnGoMain>
    </>
  ) : (
    <Typography variant="h5" component="h5">
      {`Error fetching currency for id ${currencyId}!`}
    </Typography>
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
