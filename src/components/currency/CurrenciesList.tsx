import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { CryptoСurrencyType } from '../types/ApiTypes';
import { CurrencyItem } from './CurrencyItem';

const tableCellHeaders = [
  '№',
  '',
  'Name',
  'VWAP(24Hr)',
  'Change (24Hr)',
  'Market Cap',
  'Price',
  '',
];

export const CurrenciesList: React.FC<{
  currencies: CryptoСurrencyType[];
  pageNum: number;
}> = ({ currencies, pageNum }) => {
  const renderTableCellHeaders = tableCellHeaders.map((cellHeader, index) => (
    <TableCell align="right" key={index} sx={{ fontWeight: 600 }}>
      {cellHeader}
    </TableCell>
  ));
  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ bgcolor: '#ddd7d7' }}>
            {renderTableCellHeaders}
          </TableRow>
        </TableHead>
        <TableBody>
          {currencies.map((currency, index) => (
            <CurrencyItem
              currency={currency}
              itemNum={pageNum + index}
              key={currency.id}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
