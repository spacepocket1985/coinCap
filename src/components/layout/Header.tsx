import { AppBar, Container } from '@mui/material';
import { PortfolioCurrencies } from '../currency/portfolioCurrencies';
import { PopularCurrencies } from '../currency/popularCurrencies';


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
