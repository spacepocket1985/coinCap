import { IconButton, TableCell, TableRow } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CryptoСurrencyType } from '../types/ApiTypes';

export const CurrencyItem: React.FC<{
  currency: CryptoСurrencyType;
  itemNum: number;
}> = ({ currency, itemNum }) => (
  <>
    <TableRow
      key={currency.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row" align="right">
        {itemNum}
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        align="right"
        sx={{ color: '#1976d2' }}
      >
        {currency.symbol}
      </TableCell>
      <TableCell component="th" scope="row" align="right">
        {currency.name}
      </TableCell>
      <TableCell align="right">{`${currency.vwap24Hr}$`}</TableCell>
      <TableCell align="right">{`${currency.changePercent24Hr}$`}</TableCell>
      <TableCell align="right">{`${currency.marketCapUsd}$`}</TableCell>
      <TableCell align="right">{`${currency.priceUsd}$`}</TableCell>
      <TableCell align="right">
        <IconButton sx={{ p: 0.3 }}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </TableCell>
    </TableRow>
  </>
);
