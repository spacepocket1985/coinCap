import { Stack, Typography } from '@mui/material';

const Currencies = [
  { currency: 'Bitcoin', value: 1500 },
  { currency: 'Ethereum', value: 1000 },
  { currency: 'Tether', value: 500 },
];

export const PopularCurrencies: React.FC = () => {
  const renderCurrencies = Currencies.map((item, index) => (
    <Stack direction={'column'} key={index} sx={{ pb: 1 }}>
      <Typography
        variant="subtitle1"
        component={'h5'}
        sx={{ color: '#dad1d1' }}
      >
        {item.currency}
      </Typography>
      <Typography variant="caption">{item.value}</Typography>
    </Stack>
  ));
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
        {renderCurrencies}
      </Stack>
    </Stack>
  );
};
