import React from 'react';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { deletePortfolioCurrency } from '../../store/slices/portfolioSlice';
import { TableData } from '../ui/TableData';
import { TableRow } from '@mui/material';

export const PortfolioData: React.FC<{ handleClose?: () => void }> = () => {
  const portfolioCurrencies = useAppSelector(
    (state) => state.portfolio.portfolioCurrency
  );
  const dispatch = useAppDispatch();
  const tableCellHeaders = ['Name', 'Price USD', 'Count', 'Total', 'Delete'];

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
            onClick={() => dispatch(deletePortfolioCurrency(currency.id))}
          >
            <DeleteIcon />
          </TableCell>
        </TableRow>
      ))}
    </TableData>
  );
};
