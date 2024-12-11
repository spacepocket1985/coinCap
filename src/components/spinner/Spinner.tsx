import { CircularProgress, Box } from '@mui/material';
export const Spinner: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress size="5rem" />
    </Box>
  );
};
