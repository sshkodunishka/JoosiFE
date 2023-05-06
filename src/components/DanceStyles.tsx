import { DanceStyle } from '@/services/dance-style';
import { Box, Chip, CircularProgress } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  loading: boolean;
  danceStyles: DanceStyle[];
};

const DanceStyles: React.FC<Props> = (props) => {
  const { loading, danceStyles } = props;

  if (loading) {
    return <CircularProgress />;
  } else if (danceStyles) {
    return (
      <Box>
        {danceStyles.map((danceStyle) => {
          return (
            <Chip
              component={Link}
              to={{
                pathname: '/',
                search: '?tab=danceStyle&danceStyle=' + danceStyle.id,
              }}
              label={danceStyle.style}
              clickable
              variant='outlined'
              key={danceStyle.id}
              style={{ marginRight: 8, marginBottom: 8 }}
            />
          );
        })}
      </Box>
    );
  } else {
    return null;
  }
};

export default DanceStyles;
