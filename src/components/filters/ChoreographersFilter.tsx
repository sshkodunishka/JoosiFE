import { User } from '@/services/masterClass';
import { Box, Chip, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

interface Props {
  loading: boolean;
  choreographers: User[];
}

const DanceTrainers: React.FC<Props> = (props) => {
  const { loading, choreographers } = props;

  if (loading) {
    return <CircularProgress />;
  } else if (choreographers) {
    return (
      <Box>
        {choreographers.map((choreographer) => {
          return (
            <Chip
              component={Link}
              to={{
                pathname: '/',
                search: '?tab=trainer&trainer=' + choreographer.id,
              }}
              label={choreographer.name}
              clickable
              variant='outlined'
              key={choreographer.id}
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

export default DanceTrainers;