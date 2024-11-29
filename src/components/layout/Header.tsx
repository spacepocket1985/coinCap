import { AppBar, Container } from '@mui/material';
import { PopularCurrencies } from '../currency/popularCurrencies';
import { PortfolioCurrencies } from '../currency/portfolioCurrencies';

export const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Container
        sx={{
          m: 'auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <PopularCurrencies />
        <PortfolioCurrencies />
      </Container>
    </AppBar>
  );
};
