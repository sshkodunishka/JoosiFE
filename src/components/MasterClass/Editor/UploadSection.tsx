import React from 'react';
import {
  Card,
  CardMedia,
  Button,
  CircularProgress,
  Stack,
} from '@mui/material';

type Props = {
  handleImageUpload: (event: any) => void;
  handleVideoUpload: (event: any) => void;
  photoLink: string | null;
  videoLink: string | null;
  uploadInProgress: boolean;
};

const UploadSection: React.FC<Props> = ({
  handleImageUpload,
  handleVideoUpload,
  photoLink,
  videoLink,
  uploadInProgress,
}) => {
  return uploadInProgress ? (
    <CircularProgress />
  ) : (
    <Stack
      direction='row'
      sx={{
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          maxWidth: '40%',
        }}>
        <input
          accept='image/jpeg,image/png'
          style={{ display: 'none' }}
          id='image-upload-button'
          type='file'
          onChange={handleImageUpload}
        />
        <label htmlFor='image-upload-button'>
          <Button
            variant='contained'
            component='span'>
            Select Image
          </Button>
        </label>
        {photoLink && (
          <CardMedia
            component='img'
            height='250'
            image={photoLink}
            alt={'masterClass image'}
            sx={{
              padding: '1em 1em 0 1em',
              objectFit: 'contain',
              cursor: 'pointer',
            }}
          />
        )}
      </Card>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 1,
          maxWidth: '40%',
        }}>
        <input
          accept='video/mp4, video/quicktime'
          style={{ display: 'none' }}
          id='video-upload-button'
          type='file'
          onChange={handleVideoUpload}
        />
        <label htmlFor='video-upload-button'>
          <Button
            variant='contained'
            component='span'>
            Select Video
          </Button>
        </label>
        {videoLink && (
          <CardMedia
            component='video'
            controls
            height='250'
            sx={{
              padding: '1em 1em 0 1em',
              objectFit: 'contain',
              cursor: 'pointer',
            }}
            src={videoLink}
          />
        )}
      </Card>
    </Stack>
  );
};

export default UploadSection;
