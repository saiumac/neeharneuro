import React from 'react';
import { TablePagination, Stack, Pagination } from '@mui/material';

interface CustomTablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  showRowsPerPageOptions?: boolean; // New prop to control visibility
}

const CustomTablePagination: React.FC<CustomTablePaginationProps> = ({
  count, page, rowsPerPage, onChangePage, onChangeRowsPerPage, showRowsPerPageOptions = true
}) => {
  const pageCount = Math.ceil(count / rowsPerPage);

  const getRowsPerPageOptions = () => {
    const options = [10];
    if (count > 10) options.push(25);
    if (count > 25) options.push(50);
    if (count > 50) options.push(100);
    return options;
  };

  return (
    <TablePagination
      component="div"
      count={count}
      page={page - 1}
      onPageChange={onChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={onChangeRowsPerPage}
      rowsPerPageOptions={showRowsPerPageOptions ? getRowsPerPageOptions() : []}
      labelRowsPerPage={showRowsPerPageOptions ? 'Show' : ''}
      labelDisplayedRows={() => 
        `${showRowsPerPageOptions ? 'Rows per page' : ''}`}
      ActionsComponent={() => (
        <React.Fragment>
          <Stack sx={{ ml: 'auto' }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={onChangePage}
              color="primary"
              variant="outlined"
              shape="rounded"
            />
          </Stack>
        </React.Fragment>
      )}
    />
  );
};

export default CustomTablePagination;
