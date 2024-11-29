import { IconButton, TableCell, TableRow } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CryptoСurrencyType } from '../types/ApiTypes';

export const CurrencyItem: React.FC<{
  currency: CryptoСurrencyType;
  itemNum: number;
}> = ({ currency, itemNum }) => {
  const currencyChangeColor = currency.changePercent24Hr > 0 ? 'green' : 'red';
  return (
    <TableRow
      key={currency.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {itemNum}
      </TableCell>
      <TableCell component="th" scope="row" sx={{ color: '#1976d2' }}>
        {currency.symbol}
      </TableCell>
      <TableCell component="th" scope="row">
        {currency.name}
      </TableCell>
      <TableCell>{`${currency.vwap24Hr}$`}</TableCell>
      <TableCell
        sx={{ color: currencyChangeColor }}
      >{`${currency.changePercent24Hr}$`}</TableCell>
      <TableCell>{`${(currency.marketCapUsd / 1e9).toFixed(1)}$`}</TableCell>
      <TableCell>{`${currency.priceUsd}$`}</TableCell>
      <TableCell>
        <IconButton sx={{ p: 0.3 }}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
