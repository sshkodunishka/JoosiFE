import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type Props = {
  currentPage: number;
  totalPagesCount: number;
  onSetPage: (v: number) => void;
};

const ListPagination: React.FC<Props> = (props) => {
  if (props.totalPagesCount < 2) {
    return null;
  }

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    event.preventDefault();
    props.onSetPage(page - 1);
  };

  return (
    <Stack
      spacing={2}
      sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}
      direction='row'>
      <Pagination
        count={props.totalPagesCount}
        page={props.currentPage + 1}
        onChange={handleChange}
        shape='rounded'
      />
    </Stack>
  );
};

export default ListPagination;
