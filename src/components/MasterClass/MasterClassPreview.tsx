import React, { MouseEvent } from 'react';
import { Observer } from 'mobx-react-lite';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Link,
} from '@mui/material';
import { MasterClass } from '@/services/masterClass';

type Props = {
  masterClass: MasterClass;
};

const MasterClassPreview: React.FC<Props> = (props) => {
  return (
    <Observer>
      {() => {
        const { masterClass } = props;

        return (
          <Card sx={{ mb: 2 }}>
            <CardHeader
              avatar={
                <Link
                  underline='none'
                  href={`#/@${masterClass.creator.name}`}>
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={masterClass.creator.photoLink}
                    alt=''
                  />
                </Link>
              }
              title={
                <Link
                  underline='none'
                  href={`#/user/${masterClass.creator.id}`}>
                  {masterClass.creator.name}
                </Link>
              }
              subheader={new Date(masterClass.eventDate).toDateString()}
            />

            {masterClass.photoLink && (
              <CardMedia
                component='img'
                height='250'
                image={masterClass.photoLink}
                alt={'masterClass image'}
                sx={{ padding: '1em 1em 0 1em', objectFit: 'contain' }}
              />
            )}

            <CardContent>
              <Link
                href={`#/masterClass/${masterClass.id}`}
                className='preview-link'>
                <Typography
                  variant='h5'
                  component='h2'
                  sx={{ mb: 1 }}>
                  {masterClass.title}
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ mb: 1 }}>
                  {masterClass.description}
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'>
                  Learn more...
                </Typography>
              </Link>
            </CardContent>
          </Card>
        );
      }}
    </Observer>
  );
};

export default MasterClassPreview;
