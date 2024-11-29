import { TableCell, TableRow } from '@mui/material';
import { CryptoСurrencyType } from '../types/ApiTypes';

export const CurrencyItem: React.FC<{ currency: CryptoСurrencyType }> = ({
  currency,
}) => (
  <>
    <TableRow
      key={currency.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {currency.name}
      </TableCell>
      <TableCell align="right">{currency.vwap24Hr}</TableCell>
      <TableCell align="right">{currency.changePercent24Hr}</TableCell>
      <TableCell align="right">{currency.marketCapUsd}</TableCell>
      <TableCell align="right">{currency.priceUsd}</TableCell>
    </TableRow>
  </>
);
