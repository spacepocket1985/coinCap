import { Box, Typography } from '@mui/material';

export const SubTitle: React.FC<{
  titleText: string;
}> = ({ titleText }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography
        component={'div'}
        variant="subtitle1"
        sx={{
          mb: 1,
          p: 1,
          bgcolor: '#1976d2',
          color: '#fff',
          borderRadius: 1,
        }}
      >
        {titleText}
      </Typography>
    </Box>
  );
};
