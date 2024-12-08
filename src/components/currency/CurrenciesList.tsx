import { CurrencyListItem } from './CurrencyListItem';

import { CryptoCurrencyType } from '../types/ApiTypes';
import { TableData } from '../ui/TableData';
import { getCurrencyNumOnPage } from '../../utils/getCurrencyNumOnPage';

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
          itemNum={getCurrencyNumOnPage(pageNum, index)}
          key={currency.id}
        />
      ))}
    </TableData>
  );
};
