import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { CryptoCurrencyType } from '../types/ApiTypes';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/storeHooks';
import {
  PortfolioCurrencyType,
  portfolioUpdateCurrency,
} from '../../store/slices/portfolioSlice';

export const CurrencyAddForm: React.FC<{
  currency: CryptoCurrencyType;
  handleClose?: () => void;
}> = ({ currency, handleClose }) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<{ count: string }>();

  const onSubmit = (data: { count: string }) => {
    const count = parseFloat(data.count);
    const total = count * Number(currency.priceUsd);
    const currency2Portfolio: PortfolioCurrencyType = {
      ...currency,
      priceUsd: Number(currency.priceUsd).toFixed(2),
      count: count,
      total: Number(total.toFixed(2)),
    };
    dispatch(portfolioUpdateCurrency(currency2Portfolio));
    reset();
    if (handleClose) handleClose();
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
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          required
          id="outlined-count"
          label="Enter quantity"
          type="text"
          margin="none"
          size="small"
          {...register('count', {
            required: 'Quantity is required',
            validate: {
              isValidNumber: (value) =>
                !isNaN(Number(value)) || 'Invalid number',
              isPositive: (value) =>
                parseFloat(value) > 0 || 'Quantity must be greater than zero',
            },
          })}
          error={!!errors.count}
          helperText={errors.count?.message}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ ml: 1, p: 0.9 }}
          disabled={!isValid}
        >
          {'Buy currency'}
        </Button>
      </Box>
    </>
  );
};
