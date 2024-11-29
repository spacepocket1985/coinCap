import * as React from 'react';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../../routes/routePaths';

export const NumberOfCurrencies = 10;

export const PaginationControls: React.FC<{
  currentPage: number;
}> = ({ currentPage }) => {
  const navigate = useNavigate();

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    navigate(`${RoutePaths.Main}?page=${value}`);
  };

  return (
    <>
      <Stack spacing={2} sx={{ margin: 'auto' }}>
        <Pagination
          count={NumberOfCurrencies}
          page={currentPage}
          onChange={handleChange}
          color="primary"
        />
      </Stack>
    </>
  );
};
