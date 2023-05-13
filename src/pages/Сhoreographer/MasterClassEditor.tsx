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
  Stack,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { CreateDescription, Descriptions } from '@/services/masterClass';
import MasterClassDescriptionEditor from '@components/MasterClass/Editor/Description/MasterClassDescriptionEditor';
import MasterClassDescription from '@components/MasterClass/Editor/Description/MasterClassDescription';
import DanceStyleSelect from '@components/MasterClass/Editor/DanceStyleSelect';
import UploadSection from '@components/MasterClass/Editor/UploadSection';

const Editor: React.FC = () => {
  const { id } = useParams();

  const [addNewDetail, setAddNewDetail] = useState<boolean>(false);
  const [selectedDescription, setSelectedDescription] = useState<
    Descriptions | CreateDescription
  >();

  const { editorStore, commonStore } = useStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (commonStore.isLoadingDanceStyles) {
      return;
    }
    commonStore.loadDanceStyles();
    if (editorStore.inProgress) {
      return;
    }
    if (id) {
      editorStore.setMasterClassId(+id);
      editorStore.loadInitialData();
    }
  }, [editorStore, id]);

  const changeTitle = (e: any) => editorStore.setTitle(e.target.value);
  const changeDescription = (e: any) =>
    editorStore.setDescription(e.target.value);

  const handleSaveMasterClassDescription = (
    description: CreateDescription | Descriptions
  ) => {
    editorStore.saveDescription(description);
    setAddNewDetail(false);
    setSelectedDescription(undefined);
  };

  const handleDeleteMasterClassDescription = (
    description: CreateDescription | Descriptions
  ) => {
    editorStore.deleteDescription(description);
  };

  const submitForm = (ev: any) => {
    ev.preventDefault();
    editorStore.submit().then((masterClass: any) => {
      navigate(`/master-class/${masterClass.id}`);
    });
  };

  const handleImageUpload = (event: any) => {
    const file = event.target.files[0];
    editorStore.uploadFile(file, true);
  };

  const handleVideoUpload = (event: any) => {
    const file = event.target.files[0];
    editorStore.uploadFile(file, false);
  };

  const isValid = () => {
    return (
      editorStore.masterClassesDescriptions.length > 0 &&
      editorStore.title.length > 0 &&
      editorStore.description.length > 0
    );
  };

  return (
    <Observer>
      {() => {
        const {
          inProgress,
          uploadInProgress,
          errors,
          title,
          description,
          photoLink,
          videoLink,
          masterClassesDescriptions,
          danceStyles, // don't delete this line
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

                <Stack
                  direction='row'
                  width='100%'
                  sx={{ justifyContent: 'space-between' }}>
                  <Stack
                    sx={{
                      width: '50%',
                      flexBasis: '0.5',
                    }}>
                    <TextField
                      variant='filled'
                      label='Title'
                      value={title}
                      required
                      onChange={changeTitle}
                      disabled={inProgress}
                      minRows={1}
                      sx={{ mb: 2 }}
                    />
                    <TextField
                      fullWidth
                      variant='filled'
                      label="What's this Master Class about?"
                      value={description}
                      required
                      onChange={changeDescription}
                      disabled={inProgress}
                      multiline
                      minRows={2}
                      sx={{ mb: 2 }}
                    />
                  </Stack>
                  <DanceStyleSelect allDanceStyles={commonStore.danceStyles} />
                </Stack>

                <UploadSection
                  handleImageUpload={handleImageUpload}
                  handleVideoUpload={handleVideoUpload}
                  photoLink={photoLink}
                  videoLink={videoLink}
                  uploadInProgress={uploadInProgress}
                />

                {/* Details  */}
                <Box>
                  <Typography variant='h3'>Details:</Typography>
                  {!addNewDetail ? (
                    <Box>
                      {masterClassesDescriptions.map(
                        (description: Descriptions | CreateDescription) => {
                          return (
                            <Box
                              key={
                                (description as Descriptions).id ||
                                (description as CreateDescription).tempId
                              }
                              sx={{ mb: 1 }}>
                              <MasterClassDescription
                                description={description}
                                onDelete={handleDeleteMasterClassDescription}
                                onUpdate={(description) => {
                                  setSelectedDescription(description);
                                  setAddNewDetail(true);
                                }}
                              />
                            </Box>
                          );
                        }
                      )}
                    </Box>
                  ) : (
                    <MasterClassDescriptionEditor
                      description={selectedDescription}
                      onCancel={() => {
                        setAddNewDetail(false);
                        setSelectedDescription(undefined);
                      }}
                      onSaveMasterClass={handleSaveMasterClassDescription}
                    />
                  )}
                  <Stack
                    sx={{ visibility: addNewDetail ? 'hidden' : 'visible' }}
                    width='30%'>
                    <Button
                      type='submit'
                      variant='contained'
                      onClick={() => {
                        setAddNewDetail(true);
                        setSelectedDescription(undefined);
                      }}
                      hidden={addNewDetail}>
                      Add new detail
                    </Button>
                    <Button
                      variant='contained'
                      onClick={(e) => submitForm(e)}
                      disabled={inProgress || !isValid()}
                      sx={{ mt: 2 }}>
                      Create Master Class
                    </Button>
                  </Stack>
                </Box>
              </Box>
            </Container>
          </Box>
        );
      }}
    </Observer>
  );
};

export default Editor;
