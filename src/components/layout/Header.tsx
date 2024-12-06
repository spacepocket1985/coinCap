import { AppBar, Container } from '@mui/material';
import { PortfolioInformer } from '../portfolio/PortfolioInformer';
import { PopularCurrencies } from '../currency/PopularCurrencies';

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
        <PortfolioInformer />
      </Container>
    </AppBar>
  );
};
