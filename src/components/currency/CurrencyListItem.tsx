import { TableCell, TableRow } from '@mui/material';

import { CryptoCurrencyType } from '../types/ApiTypes';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';
import { ModalIcon, ModalWindow } from '../modalWindow/ModalWindow';
import { CurrencyAddForm } from './CurrencyAddForm';

export const CurrencyListItem: React.FC<{
  currency: CryptoCurrencyType;
  itemNum: number;
}> = ({ currency, itemNum }) => {
  const navigate = useNavigate();
  const currencyChangeColor =
    Number(currency.changePercent24Hr) > 0 ? 'green' : 'red';
  const handleOnClick = (id: string) => navigate(`${RoutePaths.Main}/${id}`);
  return (
    <TableRow
      key={currency.id}
      sx={{
        '&:last-child td, &:last-child th': { border: 0 },
        cursor: 'pointer',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
      onClick={() => {
        handleOnClick(currency.id);
      }}
    >
      <TableCell>{itemNum}</TableCell>
      <TableCell  sx={{ color: '#1976d2' }}>{currency.symbol}</TableCell>
      <TableCell>{currency.name}</TableCell>
      <TableCell>{currency.vwap24Hr}</TableCell>
      <TableCell sx={{ color: currencyChangeColor }}>
        {currency.changePercent24Hr}
      </TableCell>
      <TableCell>{currency.marketCapUsd}</TableCell>
      <TableCell>{currency.priceUsd}</TableCell>
      <TableCell
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <ModalWindow iconType={ModalIcon.Add} pageTitle={'Buy some currency'}>
          {(handleClose) => (
            <CurrencyAddForm handleClose={handleClose} currency={currency} />
          )}
        </ModalWindow>
      </TableCell>
    </TableRow>
  );
};
