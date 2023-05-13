import MasterClassPreview from '@components/MasterClass/MasterClassPreview';
import ListPagination from '@components/ListPagination';
import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Descriptions } from '@/services/masterClass';

type Props = {
  descriptions: Descriptions[];
  loading: boolean;
  totalPagesCount: number;
  currentPage: number;
  onSetPage: (page: number) => void;
};

const MasterClassList: React.FC<Props> = (props) => {
  if (props.loading && props.descriptions.length === 0) {
    return <CircularProgress />;
  }

  if (props.descriptions.length === 0) {
    return (
      <Box sx={{ py: 3 }}>
        <Typography>No master classes are here... yet.</Typography>
      </Box>
    );
  }
  return (
    <Box>
      {props.descriptions.map((description) => {
        return (
          <MasterClassPreview
            description={description}
            key={description.id}
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
