import { CurrencyListItem } from './CurrencyListItem';

import { CryptoCurrencyType } from '../types/ApiTypes';
import { TableData } from '../ui/TableData';
import { BaseLimit } from '../../store/slices/apiSlice';

const tableCellHeaders = [
  '№',
  '',
  'Name',
  'VWAP(24Hr), $',
  'Change (24Hr), $',
  'Market Cap, bn$',
  'Price, $',
  '',
];

export const CurrenciesList: React.FC<{
  currencies: CryptoCurrencyType[];
  pageNum: number;
}> = ({ pageNum, currencies }) => {
  return (
    <TableData tableCellHeaders={tableCellHeaders}>
      {currencies.map((currency, index) => (
        <CurrencyListItem
          currency={currency}
          itemNum={BaseLimit * (pageNum - 1) + index + 1}
          key={currency.id}
        />
      ))}
    </TableData>
  );
};
