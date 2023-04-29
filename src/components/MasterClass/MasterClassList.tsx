import MasterClassPreview from '@components/MasterClass/MasterClassPreview';
import ListPagination from '@components/ListPagination';
import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { MasterClass } from '@/services/masterClass';

type Props = {
  masterClasss: MasterClass[];
  loading: boolean;
  totalPagesCount: number;
  currentPage: number;
  onSetPage: (page: number) => void;
};

const MasterClassList: React.FC<Props> = (props) => {
  if (props.loading && props.masterClasss.length === 0) {
    return <CircularProgress />;
  }

  if (props.masterClasss.length === 0) {
    return (
      <Box sx={{ py: 3 }}>
        <Typography>No masterClasss are here... yet.</Typography>
      </Box>
    );
  }
  return (
    <Box>
      {props.masterClasss.map((masterClass) => {
        return (
          <MasterClassPreview
            masterClass={masterClass}
            key={masterClass.id}
          />
        );
      })}
      <ListPagination
        onSetPage={props.onSetPage}
        totalPagesCount={props.totalPagesCount}
        currentPage={props.currentPage}
      />
    </Box>
  );
};

export default MasterClassList;
