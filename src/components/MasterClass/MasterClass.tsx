import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Card,
  CardMedia,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import { useStore } from '../../store';
import RedError from '@components/Errors/RedError';
import MasterClassMeta from './MasterClassMeta';
import MasterClassActions from './MasterClassActions';
// import CommentContainer from './CommentContainer';

const MasterClass: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { masterClassStore, userStore } = useStore();
  useEffect(() => {
    if (id) {
      if (isNaN(+id)) {
        navigate('/');
        return;
      }
      masterClassStore.loadMasterClass(+id, { acceptCached: true });
    }
  }, [masterClassStore, id]);

  const handleDeleteArticle = (id: number) => {
    masterClassStore.deleteMasterClass(id).then(() => navigate('/'));
  };

  const theme = useTheme();

  return (
    <Observer>
      {() => {
        const { currentUser } = userStore;

        if (!id) return <RedError message="Can't load masterClass" />;
        // const { comments, commentErrors } = commentStore;
        const masterClass = masterClassStore.getMasterClass(+id || null);
        if (!masterClass) return <RedError message="Can't load masterClass" />;

        const canModify =
          (currentUser && currentUser.id === masterClass.creator.id) || false;

        return (
          <Box
            sx={{
              mt: '10px',
              mb: '10px',
              width: '90%',
              height: '100%',
            }}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              {/* MasterClass title, photo, meta  */}
              <Stack direction='row'>
                <Card
                  sx={{
                    m: '10px 20px',
                    p: 5,
                    flexBasis: '30%',
                  }}>
                  <Typography variant='h4'>{masterClass.title}</Typography>
                  {masterClass.photoLink && (
                    <Box sx={{ width: '250px', height: '300px' }}>
                      <CardMedia
                        component='img'
                        height='250'
                        width='250'
                        image={masterClass.photoLink}
                        alt={'masterClass image'}
                        sx={{
                          m: 5,
                          padding: '1em 1em 0 1em',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  )}
                  <MasterClassMeta
                    masterClass={masterClass}
                    canModify={canModify}
                    onDelete={handleDeleteArticle}
                  />
                </Card>
                {/* Video  */}
                {masterClass.photoLink ? (
                  <Card sx={{ flexBasis: '70%', m: '10px 20px', p: 5 }}>
                    <CardMedia
                      component='img'
                      height='450'
                      width='350'
                      image={masterClass.photoLink}
                      alt={'masterClass image'}
                      sx={{
                        m: 5,
                        padding: '1em 1em 0 1em',
                        objectFit: 'contain', // or "contain" if you prefer
                      }}
                    />
                  </Card>
                ) : (
                  <Card sx={{ flexBasis: '70%', m: '10px 20px', p: 5 }}>
                    <CardMedia
                      component='img'
                      height='450'
                      width='350'
                      image={masterClass.photoLink}
                      alt={'masterClass image'}
                      sx={{
                        m: 5,
                        padding: '1em 1em 0 1em',
                        objectFit: 'contain', // or "contain" if you prefer
                      }}
                    />
                  </Card>
                )}
              </Stack>
              {/* Description, tags, action buttons  */}
              <Card sx={{ m: 2, p: 2 }}>
                <Box sx={{ p: 2 }}>
                  <Box
                    sx={{
                      mb: 2,
                      typography: 'body1',
                    }}>
                    {masterClass.description}
                  </Box>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
                    {masterClass.danceStyles.map((danceStyle) => {
                      return (
                        <Chip
                          key={danceStyle.id}
                          label={danceStyle.name}
                          sx={{ mr: 1, mb: 1 }}
                          variant='outlined'
                        />
                      );
                    })}
                  </Box>
                </Box>
                <Box>
                  <MasterClassActions
                    canModify={canModify}
                    masterClass={masterClass}
                    onDelete={handleDeleteArticle}
                  />
                </Box>
              </Card>
            </Card>
          </Box>
        );
      }}
    </Observer>
  );
};

export default MasterClass;
