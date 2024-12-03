import { TableRow, TableCell, Link } from '@mui/material';
import { CryptoCurrencyType } from '../types/ApiTypes';
import { TableData } from '../ui/TableData';

const cryptoCurrency: CryptoCurrencyType = {
  id: 'Unique identifier',
  rank: 'Market capitalization rank',
  symbol: 'Trading symbol (e.g., BTC)',
  name: 'Full name of the cryptocurrency',
  supply: 'Total circulating supply',
  maxSupply: 'Maximum supply',
  marketCapUsd: 'Market capitalization (in USD)',
  volumeUsd24Hr: 'Trading volume over the last 24 hours (in USD)',
  priceUsd: 'Current price (in USD)',
  changePercent24Hr: 'Price change over the last 24 hours (%)',
  vwap24Hr: 'Volume-weighted average price over the last 24 hours (in USD)',
  explorer: 'Link to blockchain explorer',
};

export const CurrencyPageItem: React.FC<{ currency: CryptoCurrencyType }> = ({
  currency,
}) => {
  const renderCells = Object.entries(cryptoCurrency).map(
    ([key, description]) => (
      <TableRow key={key}>
        <TableCell sx={{ fontSize: 15 }}>{description}</TableCell>
        {description === cryptoCurrency.explorer ? (
          <TableCell>
            <Link
              href={currency[key as keyof CryptoCurrencyType]}
              target="_blank"
              rel="noopener noreferrer"
            >
              {currency[key as keyof CryptoCurrencyType]}
            </Link>
          </TableCell>
        ) : (
          <TableCell>{currency[key as keyof CryptoCurrencyType]}</TableCell>
        )}
      </TableRow>
    )
  );

  const tableCellHeaders = ['Information', 'Currency data'];

  return (
    <TableData tableCellHeaders={tableCellHeaders}>{renderCells}</TableData>
  );
};
