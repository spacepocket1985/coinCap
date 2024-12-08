import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { BtnGoMain, BtnGoMainType } from '../ui/BtnGoMain';
import { ModalIcon, ModalWindow } from '../modalWindow/ModalWindow';
import { PortfolioData } from './PortfolioData';
import { getQueriesFromLS } from '../../utils/localStorageActions';
import {
  PortfolioCurrencyType,
  portfolioReload,
} from '../../store/slices/portfolioSlice';
import {
  coinCapApi,
  useGetCurrenciesByIdsQuery,
} from '../../store/slices/apiSlice';

export const PortfolioInformer: React.FC = () => {
  const { portfolioTotal, portfolioDifference } = useAppSelector(
    (state) => state.portfolio
  );
  const [isFirstLoading, setIsFirstLoading] = useState(true);

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

      const dataForUpdate: PortfolioCurrencyType[] = localPortfolio.map(
        (item) => {
          const priceData = data.data.find(
            (currency) => currency.id === item.id
          );

          if (isFirstLoading) item.firstAddition = false;

          if (
            priceData &&
            Number(priceData.priceUsd) !== Number(item.priceUsd) &&
            !item.firstAddition
          ) {
            item.isChange = true;
            setIsFirstLoading(false);
          }

          const newPrice = priceData ? priceData.priceUsd : item.priceUsd;

          return {
            ...item,
            priceUsd: newPrice,
            firstAddition: false,
            total: Number((Number(newPrice) * item.count).toFixed(3)),
          };
        }
      );

      if (dataForUpdate.length) {
        const isDifference = dataForUpdate.some((item) => item.isChange);

        dispatch(portfolioReload({ currencies: dataForUpdate, isDifference }));
        dispatch(coinCapApi.util.invalidateTags(['Currency']));
      }
    }
  }, [data, dispatch, isFirstLoading]);

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
