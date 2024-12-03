import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { CryptoCurrencyType } from '../types/ApiTypes';
import { useState } from 'react';

export const CurrencyAddForm: React.FC<{
  currency: CryptoCurrencyType;
  handleClose: () => void;
}> = ({ currency, handleClose }) => {
  const [count, setCount] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (value === '' || isFinite(Number(value))) {
      if (value.split('.').length <= 2) {
        setCount(value);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericValue = parseFloat(count);
    if (numericValue > 0) {
      console.log(`Purchasing ${numericValue} of ${currency.name}`);
      handleClose();
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
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{ mb: 2 }}
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="outlined-count"
          label="Enter quantity"
          type="text"
          margin="none"
          size="small"
          value={count}
          onChange={handleOnChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ ml: 1, p: 0.9 }}
          disabled={parseFloat(count) <= 0}
        >
          {'Buy'}
        </Button>
      </Box>
    </>
  );
};
