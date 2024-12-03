import HomeIcon from '@mui/icons-material/Home';
import { Button, IconButton } from '@mui/material';
import { RoutePaths } from '../../routes/routePaths';
import { useNavigate } from 'react-router-dom';

export enum BtnGoMainType {
  Icon = 'icon',
  Button = 'button',
}

export const BtnGoMain: React.FC<{
  children?: React.ReactNode;
  type: BtnGoMainType;
}> = ({ children, type }) => {
  const navigate = useNavigate();

  return (
    <>
      {type === BtnGoMainType.Icon ? (
        <IconButton color="inherit" onClick={() => navigate(RoutePaths.Main)}>
          <HomeIcon fontSize="large" />
          {children}
        </IconButton>
      ) : (
        <Button
          variant="contained"
          onClick={() => navigate(RoutePaths.Main)}
          startIcon={<HomeIcon />}
          sx={{ mb: 1 }}
        >
          {children}
        </Button>
      )}
    </>
  );
};
