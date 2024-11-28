import { AppBar, Toolbar } from '@mui/material';
import { PopularCurrencies } from '../currency/popularCurrencies';

export const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar sx={{ m: 'auto' }}>
        <PopularCurrencies />
      </Toolbar>
    </AppBar>
  );
};
