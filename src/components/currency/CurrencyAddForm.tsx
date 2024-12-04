import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { CryptoCurrencyType } from '../types/ApiTypes';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/storeHooks';
import {

  portfolioUpdateCurrency,
} from '../../store/slices/portfolioSlice';
import { getQueriesFromLS } from '../../utils/localStorageActions';
import { useGetCurrenciesByIdsQuery } from '../../store/slices/apiSlice';

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

  const localPortfolio = getQueriesFromLS();
  const portfolioIds = localPortfolio.map((item) => item.id).join(',');
  const portfolioIdsForRequest = portfolioIds
    ? portfolioIds + `,${currency.id}`
    : currency.id;

  const { data: reloadData } = useGetCurrenciesByIdsQuery(
    portfolioIdsForRequest
  );
  
  const onSubmit = (data: { count: string }) => {
    if (reloadData) {
      const dataForUpdate = reloadData.data.map((item) => {
        const portfolioIndex = localPortfolio.findIndex(
          (localCurrency) => localCurrency.id === item.id
        );
        const newCount =
          portfolioIndex === -1
            ? Number(data.count)
            : localPortfolio[portfolioIndex].id === currency.id
              ? Number(data.count) + localPortfolio[portfolioIndex].count
              : localPortfolio[portfolioIndex].count;
        return {
          ...item,
          count: newCount,
          total: Number((item.priceUsd * newCount).toFixed(3)),
        };
      });
      
      dispatch(portfolioUpdateCurrency(dataForUpdate));
      reset();
      if (handleClose) handleClose();
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
