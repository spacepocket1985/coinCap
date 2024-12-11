import { AppBar, Container } from '@mui/material';
import { PortfolioInformer } from '../portfolio/PortfolioInformer';
import { PopularCurrencies } from '../currency/popularCurrencies';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/storeHooks';
import { coinCapApi } from '../../store/slices/apiSlice';

export const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (!isInitialLoad) {
      dispatch(coinCapApi.util.invalidateTags(['Currency']));
    } else {
      setIsInitialLoad(false);
    }
  }, [dispatch, location, isInitialLoad]);

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
