import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from '@/store';
import { Observer } from 'mobx-react-lite';
import {
  Avatar,
  Box,
  Card,
  CardMedia,
  Chip,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import ListErrors from '@components/Errors/ListErrors';
import { EmptyImageLink } from '@/services/constants';

const ChoreographerPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { choreographersStore } = useStore();

  useEffect(() => {
    if (id) {
      if (isNaN(+id)) {
        navigate('/');
        return;
      }
      if (choreographersStore.isLoading) {
        return;
      }
      choreographersStore.loadChoreographer(+id);
    }
  });

  return (
    <Observer>
      {() => {
        const { choreographer, error } = choreographersStore;

        if (error) return <ListErrors errors={[error]} />;
        if (!choreographer) return <h1>Can't load choreographer</h1>;
        return (
          <Box sx={{ mt: 3, mb: 3, width: '70%', height: '100%' }}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                width: '100%',
                justifyContent: 'center',
              }}>
              <Stack
                sx={{
                  width: '100%',
                  ml: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Avatar
                  sx={{ mt: 1, flexGrow: 0, width: 150, height: 150 }}
                  alt={choreographer.name}
                  src={choreographer.photoLink || EmptyImageLink}
                />
                <Typography
                  sx={{ justifyContent: 'center', mt: 2, display: 'flex' }}
                  variant='h4'>
                  {choreographer.name + ' ' + choreographer.lastName}
                </Typography>
                <Typography
                  sx={{ justifyContent: 'center', mt: 2, display: 'flex' }}
                  variant='h6'>
                  {choreographer.description}
                </Typography>
                <Typography
                  sx={{ justifyContent: 'center', mt: 2, display: 'flex' }}
                  variant='h6'>
                  Dance Styles:
                </Typography>
                <Box
                  sx={{
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                  {choreographer.MasterClasses.map((masterClass) => {
                    return masterClass.ClassesStyles.map((danceStyle) => {
                      return (
                        <Chip
                          key={danceStyle.style.id}
                          label={danceStyle.style.style}
                          sx={{ mr: 1, mb: 1, width: 'fit-content' }}
                          variant='outlined'
                        />
                      );
                    });
                  })}
                </Box>

                <Typography
                  sx={{
                    justifyContent: 'center',
                    mt: 2,
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  variant='h6'>
                  Master classes:
                </Typography>
                {choreographer.MasterClasses.map((masterClass) => {
                  return masterClass.Descriptions.map((description) => {
                    return (
                      <Card
                        onClick={() =>
                          navigate(`/master-classes/${description.id}`)
                        }
                        sx={{
                          width: '70%',
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'start',
                          mb: 1,
                          p: 1,
                          cursor: 'pointer',
                        }}
                        key={description.id}>
                        <CardMedia
                          component='img'
                          height='200'
                          image={masterClass.imageLink || EmptyImageLink}
                          alt={'masterClass image'}
                          sx={{
                            width: '50%',
                            borderRadius: '10px',
                            objectFit: 'contain',
                          }}
                        />
                        <Stack
                          sx={{
                            flexGrow: 1,
                            mt: 2,
                            ml: 3,
                            justifyContent: 'start',
                          }}>
                          <Typography
                            variant='h5'
                            sx={{ justifyContent: 'center' }}>
                            {masterClass.title}
                          </Typography>
                          <Typography sx={{ justifyContent: 'center' }}>
                            {description.eventDate}
                          </Typography>
                          <Typography sx={{ justifyContent: 'center', mt: 2 }}>
                            {masterClass.description.slice(0, 100) + '...'}
                          </Typography>
                        </Stack>
                      </Card>
                    );
                  });
                })}
                {choreographer.MasterClasses.length === 0 && (
                  <Typography sx={{ mt: 2 }}>
                    No master classes yet...
                  </Typography>
                )}
              </Stack>
            </Card>
          </Box>
        );
      }}
    </Observer>
  );
};

export default ChoreographerPage;
