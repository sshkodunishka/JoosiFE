import { EmptyImageLink } from '@/services/constants';
import { useStore } from '@/store';
import { Box, Card, CardMedia, Chip, Stack, Typography } from '@mui/material';
import { Observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChoreographersPage: React.FC = () => {
  const { choreographersStore } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (choreographersStore.isLoading) {
      return;
    }
    async function loadChoreographers() {
      await choreographersStore.loadAllChoreoghraphs();
    }
    loadChoreographers();
  }, [choreographersStore]);

  return (
    <Observer>
      {() => {
        return (
          <Box sx={{ width: '80%', height: '100%', flex: '1' }}>
            <h1>Choreographers</h1>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              {choreographersStore.choreographers.map((choreographer) => (
                <Card
                  onClick={() =>
                    navigate(`/choreographers/${choreographer.id}`)
                  }
                  key={choreographer.id}
                  sx={{
                    width: '300px',
                    height: '300px',
                    m: 1,
                    borderRadius: 3,
                    cursor: 'pointer',
                  }}>
                  <CardMedia
                    component='img'
                    height='250'
                    image={choreographer.photoLink || EmptyImageLink}
                    alt={'Dancer image'}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <Stack
                    direction='row'
                    sx={{ mt: 1, justifyContent: 'space-between' }}>
                    <Typography
                      color='primary'
                      variant='h5'
                      sx={{ ml: 2 }}>
                      {choreographer.name}
                    </Typography>
                    {choreographer.MasterClasses[0]?.ClassesStyles[0]?.style
                      ?.style && (
                      <Chip
                        label={
                          choreographer.MasterClasses[0].ClassesStyles[0].style
                            .style
                        }
                        sx={{ mr: 1, mb: 1 }}
                        variant='outlined'
                      />
                    )}
                  </Stack>
                </Card>
              ))}
              {choreographersStore.choreographers.length === 0 && (
                <Typography variant='h5'>No choreographers</Typography>
              )}
            </Box>
          </Box>
        );
      }}
    </Observer>
  );
};

export default ChoreographersPage;
