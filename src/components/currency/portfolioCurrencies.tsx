import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { Stack, Typography } from '@mui/material';
import { BtnGoMain, BtnGoMainType } from '../btnGoMain/BtnGoMain';

export const PortfolioCurrencies: React.FC = () => {
  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <WorkOutlineIcon fontSize="large" />
      <Stack direction={'column'}>
        <Typography
          variant="subtitle1"
          component={'h5'}
          sx={{ color: '#dad1d1' }}
        >
          {'Total'}
        </Typography>
        <Typography variant="subtitle1">{'5000 USD'}</Typography>
      </Stack>
      <BtnGoMain type={BtnGoMainType.Icon} />
    </Stack>
  );
};
