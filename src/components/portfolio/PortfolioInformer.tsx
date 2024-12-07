import { Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { BtnGoMain, BtnGoMainType } from '../ui/BtnGoMain';
import { ModalIcon, ModalWindow } from '../modalWindow/ModalWindow';
import { PortfolioData } from './PortfolioData';
import { getQueriesFromLS } from '../../utils/localStorageActions';
import {
  PortfolioCurrencyType,
  reloadPortfolio,
} from '../../store/slices/portfolioSlice';
import {
  coinCapApi,
  useGetCurrenciesByIdsQuery,
} from '../../store/slices/apiSlice';

export const PortfolioInformer: React.FC = () => {
  const { portfolioTotal, portfolioDifference } = useAppSelector(
    (state) => state.portfolio
  );

  const dispatch = useAppDispatch();

  const portfolioIds = getQueriesFromLS()
    .map((item) => item.id)
    .join(',');
  const { data } = useGetCurrenciesByIdsQuery(portfolioIds, {
    skip: !portfolioIds,
  });

  useEffect(() => {
    if (data) {
      const localPortfolio = getQueriesFromLS();

      let isDifference = false;

      const dataForUpdate: PortfolioCurrencyType[] = localPortfolio.map(
        (item) => {
          const priceData = data.data.find(
            (currency) => currency.id === item.id
          );

          if (
            priceData &&
            priceData.priceUsd !== item.priceUsd &&
            item.count !== 0
          ) {
            isDifference = true;
          }

          const newPrice = priceData ? priceData.priceUsd : item.priceUsd;

          return {
            ...item,
            priceUsd: newPrice,
            total: Number((Number(newPrice) * item.count).toFixed(3)),
            isChange: isDifference,
          };
        }
      );

      if (dataForUpdate.length) {
        dispatch(reloadPortfolio({ currencies: dataForUpdate, isDifference }));
        dispatch(coinCapApi.util.invalidateTags(['Currency']));
      }
    }
  }, [data, dispatch]);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <ModalWindow
        iconType={ModalIcon.Partfolio}
        iconColor="#fff"
        pageTitle="Currency portfolio"
      >
        {(handleClose) => <PortfolioData handleClose={handleClose} />}
      </ModalWindow>
      <Stack direction="column">
        <Typography
          variant="subtitle1"
          component="h5"
          sx={{ color: '#dad1d1' }}
        >
          {'Total'}
        </Typography>
        <Typography variant="subtitle1">{`${portfolioTotal} USD`}</Typography>
        <Typography variant="subtitle1">{`${portfolioDifference}`}</Typography>
      </Stack>
      <BtnGoMain type={BtnGoMainType.Icon} />
    </Stack>
  );
};
