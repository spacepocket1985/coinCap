import { Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { BtnGoMain, BtnGoMainType } from '../ui/BtnGoMain';
import { ModalIcon, ModalWindow } from '../modalWindow/ModalWindow';
import { PortfolioData } from './PortfolioData';
import { getQueriesFromLS } from '../../utils/localStorageActions';
import { useGetCurrenciesByIdsQuery } from '../../store/slices/apiSlice';
import {
  PortfolioCurrencyType,
  portfolioReload,
} from '../../store/slices/portfolioSlice';

export const PortfolioInformer: React.FC = () => {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const portfolioTotal = useAppSelector(
    (state) => state.portfolio.portfolioTotal
  );
  const dispatch = useAppDispatch();
  const localPortfolio = getQueriesFromLS();
  const portfolioIds = localPortfolio.map((item) => item.id).join(',');

  const { data } = useGetCurrenciesByIdsQuery(isFirstLoad ? portfolioIds : '', {
    skip: !isFirstLoad || !portfolioIds,
  });

  useEffect(() => {
    if (data && isFirstLoad) {
      console.log('reload');
      const dataForUpdate: PortfolioCurrencyType[] = [];
      localPortfolio.forEach((item, index) => {
        const newPrice = Number(data.data[index].priceUsd);
        const element: PortfolioCurrencyType = {
          ...item,
          priceUsd: newPrice,
          total: newPrice * item.count,
        };
        dataForUpdate.push(element);
        setIsFirstLoad(false);
        dispatch(portfolioReload(dataForUpdate));
      });
    }
  }, [data, dispatch, isFirstLoad, localPortfolio]);

  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <ModalWindow iconType={ModalIcon.Partfolio} iconColor="#fff">
        {(handleClose) => <PortfolioData handleClose={handleClose} />}
      </ModalWindow>
      <Stack direction={'column'}>
        <Typography
          variant="subtitle1"
          component={'h5'}
          sx={{ color: '#dad1d1' }}
        >
          {'Total'}
        </Typography>
        <Typography variant="subtitle1">{`${portfolioTotal} USD`}</Typography>
      </Stack>
      <BtnGoMain type={BtnGoMainType.Icon} />
    </Stack>
  );
};
