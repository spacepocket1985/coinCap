import React from 'react';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';

import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { portfolioUpdateCurrency } from '../../store/slices/portfolioSlice';
import { TableData } from '../ui/TableData';
import { TableRow } from '@mui/material';
import { getQueriesFromLS } from '../../utils/localStorageActions';
import { useGetCurrenciesByIdsQuery } from '../../store/slices/apiSlice';

export const PortfolioData: React.FC<{ handleClose?: () => void }> = () => {
  const portfolioCurrencies = useAppSelector(
    (state) => state.portfolio.portfolioCurrency
  );
  const dispatch = useAppDispatch();
  const tableCellHeaders = ['Name', 'Price USD', 'Count', 'Total', 'Delete'];

  const localPortfolio = getQueriesFromLS();
  const portfolioIds = localPortfolio.map((item) => item.id).join(',');

  const { data: reloadData } = useGetCurrenciesByIdsQuery(
    portfolioIds
  );
  
  const handleDeleteCurrency = (id: string):void => {
    if (reloadData) {
      const filterDataFromAPi = reloadData.data.filter(item=> item.id !== id);
      const filterDataFromPortfolio = localPortfolio.filter(item=> item.id !== id);

      const dataForUpdate = filterDataFromAPi.map((item,index)=>{
        const newCount = filterDataFromPortfolio[index].count;
        return {
          ...item, count: newCount, total:Number((item.priceUsd*newCount).toFixed(3))
        }
      })
      dispatch(portfolioUpdateCurrency(dataForUpdate))
      
    }
  }
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
    </TableData>
  );
};
