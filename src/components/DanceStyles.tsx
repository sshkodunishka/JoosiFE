import { Box, Chip, CircularProgress } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  loading: boolean;
  danceStyles: string[];
};

const DanceStyles: React.FC<Props> = (props) => {
  const { loading, danceStyles } = props;

  if (loading) {
    return <CircularProgress />;
  } else if (danceStyles) {
    return (
      <Box >
        {danceStyles.map((danceStyle) => {
          return (
            <Chip
              component={Link}
              to={{
                pathname: '/',
                search: '?tab=danceStyle&danceStyle=' + danceStyle,
              }}
              label={danceStyle}
              clickable
              variant='outlined'
              key={danceStyle}
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
