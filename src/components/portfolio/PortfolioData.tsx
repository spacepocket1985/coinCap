import React from 'react';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { portfolioDeleteCurrency } from '../../store/slices/portfolioSlice';
import { TableData } from '../ui/TableData';
import { TableRow } from '@mui/material';
import { SubTitle } from '../ui/SubTitle';

export const PortfolioData: React.FC<{ handleClose?: () => void }> = () => {
  const portfolioCurrencies = useAppSelector(
    (state) => state.portfolio.portfolioCurrency
  );
  const dispatch = useAppDispatch();
  const { portfolioTotal } = useAppSelector((state) => state.portfolio);
  const tableCellHeaders = [
    'Name',
    'Price USD',
    'Price change',
    'Count',
    'Total',
    'Delete',
  ];

  const handleDeleteCurrency = (id: string): void => {
    dispatch(portfolioDeleteCurrency(id));
  };
  return (
    <>
      {portfolioCurrencies.length > 0 ? (
        <TableData tableCellHeaders={tableCellHeaders}>
          {portfolioCurrencies.map((currency) => (
            <TableRow key={currency.id}>
              <TableCell>{currency.name}</TableCell>
              <TableCell>{currency.priceUsd}</TableCell>
              <TableCell align="center">
                {currency.isChange && <CheckCircleIcon color="primary" />}
              </TableCell>
              <TableCell>{currency.count}</TableCell>
              <TableCell>{currency.total}</TableCell>
              <TableCell
                align="center"
                sx={{ cursor: 'pointer' }}
                onClick={() => handleDeleteCurrency(currency.id)}
              >
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ bgcolor: '#ddd7d7' }}>
            <TableCell colSpan={4}>{'Total cost'}</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>{portfolioTotal}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableData>
      ) : (
        <SubTitle titleText="Your portfolio is empty! Time to buy something)"></SubTitle>
      )}
    </>
  );
};
