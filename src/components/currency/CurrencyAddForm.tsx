import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { CryptoCurrencyType } from '../types/ApiTypes';
import { useState } from 'react';

export const CurrencyAddForm: React.FC<{ currency: CryptoCurrencyType }> = ({
  currency,
}) => {
  const [count, setCount] = useState(0);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value === '' || value.length === 1 || value[0] !== '0') {
      setCount(Number(value));
    }
  };
  return (
    <>
      <Stack
        spacing={2}
        direction={'row'}
        sx={{ mb: 1.5, color: '#1976d2' }}
        alignItems={'center'}
      >
        <Typography
          variant="h4"
          component={'h4'}
          sx={{ border: 'solid .3rem #1976d2', p: 1, borderRadius: 2 }}
        >
          {currency!.symbol}
        </Typography>
        <Typography variant="h2" component={'h2'}>
          {currency!.name}
        </Typography>
      </Stack>
      <Box component="form" noValidate autoComplete="off" sx={{ mb: 2 }}>
        <TextField
          required
          id="outlined-cout"
          label="Enter quantity"
          type="number"
          margin="none"
          size="small"
          value={count}
          onChange={handleOnChange}
        />
        <Button
          variant="contained"
          color="primary"
          sx={{ ml: 1, p: 0.9 }}
          disabled={count <= 0}
        >
          {'Buy'}
        </Button>
      </Box>
    </>
  );
};
