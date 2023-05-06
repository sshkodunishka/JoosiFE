import React, { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import ListErrors from '@components/Errors/ListErrors';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Input,
  IconButton,
  Stack,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import Close from '@mui/icons-material/Close';

const Editor: React.FC = () => {
  const { id } = useParams();

  const [danceStyleInput, setDanceStyle] = useState<string>('');

  const { editorStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      editorStore.setMasterClassId(+id);
      editorStore.loadInitialData();
    }
  }, [editorStore, id]);

  const changeTitle = (e: any) => editorStore.setTitle(e.target.value);
  const changeDescription = (e: any) =>
    editorStore.setDescription(e.target.value);

  const changePrice = (e: any) => {
    console.log('changePrice');
    console.log(+e.target.value);
    editorStore.setPrice(+e.target.value);
  };
  const changeEventDate = (e: any) => editorStore.setEventData(e.target.value);
  const changePhotoLink = (e: any) => editorStore.setPhotoLink(e.target.value);
  const changeVideoLink = (e: any) => editorStore.setVideoLink(e.target.value);

  const changeDanceStyleInput = (e: any) => setDanceStyle(e.target.value);

  const handleDanceStyleInputKeyDown = (ev: any) => {
    switch (ev.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // ,
        if (ev.keyCode !== 9) ev.preventDefault();
        handleAddDanceStyle();
        break;
      default:
        break;
    }
  };

  const handleAddDanceStyle = () => {
    if (danceStyleInput) {
      editorStore.addDanceStyle(danceStyleInput.trim());
      setDanceStyle('');
    }
  };

  const handleRemoveDanceStyle = (danceStyle: string) => {
    if (editorStore.inProgress) return;
    editorStore.removeDanceStyle(danceStyle);
  };

  const submitForm = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    editorStore.submit().then((masterClass: any) => {
      editorStore.reset();
      navigate(`/master-class/${masterClass.id}`);
    });
  };

  return (
    <Observer>
      {() => {
        const {
          inProgress,
          errors,
          title,
          description,
          price,
          eventDate,
          photoLink,
          videoLink,
          danceStyles,
        } = editorStore;

        return (
          <Box
            sx={{
              backgroundColor: grey[100],
              mt: 2,
              mb: 2,
              pt: 4,
              pb: 4,
              height: '100%',
              width: '80%',
            }}>
            <Container>
              <ListErrors errors={errors} />

              <Box
                component='form'
                onSubmit={submitForm}
                sx={{ mt: 2 }}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant='h4'>Create a master class</Typography>
                </Box>

                <Stack direction='row'>
                  <TextField
                    variant='filled'
                    label='Title'
                    value={title}
                    onChange={changeTitle}
                    disabled={inProgress}
                    sx={{ mb: 2, mr: 5 }}
                  />
                  <TextField
                    type='datetime-local'
                    value={eventDate}
                    onChange={changeEventDate}
                    disabled={inProgress}
                    sx={{ mb: 2, mr: 2 }}
                  />
                </Stack>

                <TextField
                  fullWidth
                  variant='filled'
                  label="What's this masterClass about?"
                  value={description}
                  onChange={changeDescription}
                  disabled={inProgress}
                  sx={{ mb: 2 }}
                />

                <Input
                  sx={{ mb: 2, mr: 2 }}
                  placeholder='Price'
                  type='number'
                  value={price.toString()}
                  onChange={changePrice}
                  onBlur={changePrice}
                  onKeyDown={changePrice}
                  disabled={inProgress}
                />

                <Input
                  sx={{ mb: 2 }}
                  placeholder='Enter danceStyles'
                  value={danceStyleInput}
                  onChange={changeDanceStyleInput}
                  onBlur={handleAddDanceStyle}
                  onKeyDown={handleDanceStyleInputKeyDown}
                  disabled={inProgress}
                />

                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  {danceStyles?.map((danceStyle) => {
                    return (
                      <Box
                        key={danceStyle.id}
                        sx={{
                          backgroundColor: '#f0f0f0',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '4px 8px',
                          margin: '0 8px 8px 0',
                        }}>
                        <IconButton
                          size='small'
                          sx={{ ml: 1, mr: 0.5 }}
                          onClick={() =>
                            handleRemoveDanceStyle(danceStyle.style)
                          }>
                          <Close fontSize='small' />
                        </IconButton>
                        {danceStyle.style}
                      </Box>
                    );
                  })}
                </Box>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={inProgress}
                  sx={{ mt: 2 }}>
                  Create Master Class
                </Button>
              </Box>
            </Container>
          </Box>
        );
      }}
    </Observer>
  );
};

export default Editor;
