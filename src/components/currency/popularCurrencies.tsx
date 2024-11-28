import { Stack, Typography } from '@mui/material';

const Currencies = [
  { currency: 'Bitcoin', value: 1500 },
  { currency: 'Ethereum', value: 1000 },
  { currency: 'Tether', value: 500 },
];

export const PopularCurrencies: React.FC = () => {
  const renderCurrencies = Currencies.map((item, index) => (
    <Stack direction={'column'} key={index}>
      <Typography>{item.currency}</Typography>
      <Typography>{item.value}</Typography>
    </Stack>
  ));
  return (
    <Stack
      direction="column"
      sx={{
        justifyContent: 'center',
        alignItems: 'flex-start',
      }}
    >
      <Typography variant="h6" component={'h6'}>
        Popular crypto currencies
      </Typography>
      <Stack direction={'row'} spacing={2}>
        {renderCurrencies}
      </Stack>
    </Stack>
  );
};
