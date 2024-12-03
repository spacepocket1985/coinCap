import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { IconButton, Typography } from '@mui/material';

const defaultTop = '35%';

const style = {
  position: 'absolute' as const,
  top: defaultTop,
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '4px solid #1976d2',
  boxShadow: 24,
  p: 4,
};

export enum ModalIcon {
  Add = 'add',
  Partfolio = 'partfolio',
}

type ModalWindowPropsType = {
  children: (handleClose: () => void) => React.ReactNode;
  iconType: ModalIcon;
  iconLabel?: string;
};

export const ModalWindow: React.FC<ModalWindowPropsType> = ({
  children,
  iconType,
  iconLabel,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => setOpen((prevOpen) => !prevOpen);

  const renderIcon = () => {
    switch (iconType) {
      case ModalIcon.Add:
        return <AddCircleIcon />;
      case ModalIcon.Partfolio:
        return <WorkOutlineIcon fontSize="large"/>;
      default:
        return null;
    }
  };

  return (
    <>
      <IconButton
        onClick={handleToggle}
        style={{
          color: '#1976d2',
          marginRight: '5px',
        }}
      >
        {renderIcon()}
        <Typography variant="subtitle2" component="span">
          {iconLabel}
        </Typography>
      </IconButton>
      <Modal open={open} onClose={handleToggle}>
        <Box sx={style}>{children(handleToggle)}</Box>
      </Modal>
    </>
  );
};
