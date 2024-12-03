import { Stack, Typography } from '@mui/material';

import { useAppSelector } from '../../hooks/storeHooks';
import { BtnGoMain, BtnGoMainType } from '../ui/BtnGoMain';
import { ModalIcon, ModalWindow } from '../modalWindow/ModalWindow';
import { PortfolioData } from './PortfolioData';

export const PortfolioInformer: React.FC = () => {
  const portfolioTotal = useAppSelector(
    (state) => state.portfolio.portfolioTotal
  );
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
