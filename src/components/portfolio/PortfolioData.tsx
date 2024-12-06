import React from 'react';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { portfolioDeleteCurrency } from '../../store/slices/portfolioSlice';
import { TableData } from '../ui/TableData';
import { TableRow } from '@mui/material';

export const PortfolioData: React.FC<{ handleClose?: () => void }> = () => {
  const portfolioCurrencies = useAppSelector(
    (state) => state.portfolio.portfolioCurrency
  );
  const dispatch = useAppDispatch();
  const { portfolioTotal } = useAppSelector((state) => state.portfolio);
  const tableCellHeaders = ['Name', 'Price USD', 'Count', 'Total', 'Delete'];

  const handleDeleteCurrency = (id: string): void => {
    dispatch(portfolioDeleteCurrency(id));
  };
  return (
    <TableData tableCellHeaders={tableCellHeaders}>
      {portfolioCurrencies.map((currency) => (
        <TableRow key={currency.id}>
          <TableCell>{currency.name}</TableCell>
          <TableCell>{currency.priceUsd}</TableCell>
          <TableCell>{currency.count}</TableCell>
          <TableCell>{currency.total}</TableCell>
          <TableCell
            sx={{ cursor: 'pointer' }}
            onClick={() => handleDeleteCurrency(currency.id)}
          >
            <DeleteIcon />
          </TableCell>
        </TableRow>
      ))}
      <TableRow sx={{ bgcolor: '#ddd7d7' }}>
        <TableCell colSpan={3}>Subtotal</TableCell>
        <TableCell sx={{ fontWeight: 600 }}>{portfolioTotal}</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableData>
  );
};
