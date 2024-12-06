import { Stack, Typography } from '@mui/material';
import { useGetCurrenciesListQuery } from '../../store/slices/apiSlice';
import { Spinner } from '../spinner/Spinner';


export const PopularCurrencies: React.FC = () => {
  const { data: currencies, isFetching } = useGetCurrenciesListQuery({
    limit: 3,
    offset: 0,
  });

  const renderCurrencies = (currencies?.data || []).map((currency, index) => (
    <Stack direction={'column'} key={index} sx={{ pb: 1 }}>
      <Typography
        variant="subtitle1"
        component={'h5'}
        sx={{ color: '#dad1d1' }}
      >
        {currency.name}
      </Typography>
      <Typography variant="caption">{currency.priceUsd}</Typography>
    </Stack>
  ));
  const contentOrSpinner = isFetching ? <Spinner /> : renderCurrencies;
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: 'center',
      }}
    >
      <Typography variant="h6" component={'h4'}>
        Popular crypto currencies
      </Typography>
      <Stack direction={'row'} spacing={2} justifyContent={'space-between'}>
        {contentOrSpinner}
      </Stack>
    </Stack>
  );
};
