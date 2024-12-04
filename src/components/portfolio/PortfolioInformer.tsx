import { Stack, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks/storeHooks';
import { BtnGoMain, BtnGoMainType } from '../ui/BtnGoMain';
import { ModalIcon, ModalWindow } from '../modalWindow/ModalWindow';
import { PortfolioData } from './PortfolioData';

export const PortfolioInformer: React.FC = () => {
  const portfolioTotal = useAppSelector(
    (state) => state.portfolio.portfolioTotal
  );
  // const dispatch = useAppDispatch();
  // const localPortfolio = getQueriesFromLS();
  // const portfolioIds = localPortfolio.map((item) => item.id).join(',');

  // const { data } = useGetCurrenciesByIdsQuery(portfolioIds);

  // if (data) {
  //   console.log('portfolioIds=', portfolioIds);
  //   console.log('localPortfolio=', localPortfolio);
  //   console.log('data=', data);
  //   console.log('reload');
  //   const dataForUpdate: PortfolioCurrencyType[] = [];
  //   localPortfolio.forEach((item, index) => {
  //     const newPrice = Number(data.data[index].priceUsd);
  //     const element: PortfolioCurrencyType = {
  //       ...item,
  //       priceUsd: newPrice,
  //       total: newPrice * item.count,
  //     };
  //     dataForUpdate.push(element);
  //     console.log('dataForUpdate = ', dataForUpdate);
  //     dispatch(reloadPortfolio(dataForUpdate));
  //   });
  // }

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
