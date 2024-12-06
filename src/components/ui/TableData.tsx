import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableCell } from '@mui/material';

export const TableData: React.FC<{
  children: React.ReactNode;
  tableCellHeaders: string[];
  tableRowBg?: string;
}> = ({ children, tableCellHeaders, tableRowBg }) => {
  const renderTableCellHeaders = tableCellHeaders.map((cellHeader, index) => (
    <TableCell key={index} sx={{ fontWeight: 600 }}>
      {cellHeader}
    </TableCell>
  ));

  return (
    <TableContainer component={Paper} sx={{ mb: 3 }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow sx={{ bgcolor: tableRowBg ? tableRowBg : '#ddd7d7' }}>
            {renderTableCellHeaders}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
};
