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
  const [isFirstLoading, setIsFirstLoading] = useState(true);
  useEffect(() => {
    if (!isFirstLoading) {
      dispatch(coinCapApi.util.invalidateTags(['Currency']));
      setIsFirstLoading(false);
    }
  }, [dispatch, isFirstLoading, location]);
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
