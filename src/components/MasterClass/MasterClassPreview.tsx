import React, { MouseEvent } from 'react';
import { Observer } from 'mobx-react-lite';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Stack,
  Box,
} from '@mui/material';
import { Descriptions, MasterClass } from '@/services/masterClass';
import { useNavigate, Link } from 'react-router-dom';
import DateComponent from '@components/Date';
import { EmptyImageLink } from '../../services/constants';

type Props = {
  description: Descriptions;
};

const MasterClassPreview: React.FC<Props> = (props) => {
  const navigate = useNavigate();
  return (
    <Observer>
      {() => {
        const { description } = props;
        return (
          <Card sx={{ mb: 2, minHeight: '350px', maxHeight: '800px' }}>
            <CardHeader
              sx={{ backgroundColor: '#f5f5f5' }}
              avatar={
                <Link to={`users/${description.MasterClasses.Users.id}`}>
                  <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={description.MasterClasses.Users.photoLink}
                    alt=''
                  />
                </Link>
              }
              title={
                <Stack
                  sx={{
                    fontSize: '14px',
                    justifyContent: 'space-between',
                  }}
                  width='100%'
                  direction='row'>
                  <Link to={`users/${description.MasterClasses.Users.id}`}>
                    {description.MasterClasses.Users.name}{' '}
                    {description.MasterClasses.Users.lastName}
                  </Link>
                  <DateComponent
                    sx={{ alignItems: 'flex-end' }}
                    eventDate={description.eventDate}
                  />
                </Stack>
              }
            />

            <CardContent
              sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'space-between',
              }}>
              <CardMedia
                component='img'
                height='250'
                image={description.MasterClasses.imageLink || EmptyImageLink}
                alt={'masterClass image'}
                sx={{
                  padding: '1em 1em 0 1em',
                  objectFit: 'contain',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`master-classes/${description.id}`)}
              />
              <Stack
                sx={{ ml: 2, width: '100%', height: '100%' }}
                className='preview-link'>
                <Link to={`master-classes/${description.id}`}>
                  <Typography
                    variant='h5'
                    component='h2'
                    sx={{ mb: 1 }}>
                    {description.MasterClasses.title}
                  </Typography>
                </Link>

                <Stack
                  sx={{ mb: 1 }}
                  direction='row'>
                  <Typography
                    component='h2'
                    sx={{ mr: 1 }}>
                    Place:
                  </Typography>
                  <Typography component='h2'>{description.place}</Typography>
                </Stack>

                <Stack
                  sx={{ mb: 1 }}
                  direction='row'>
                  <Typography
                    component='h2'
                    sx={{ mr: 1 }}>
                    People:
                  </Typography>
                  <Typography component='h2'>
                    {description.countOfPeople}
                  </Typography>
                </Stack>
                <Stack
                  sx={{ mb: 1 }}
                  direction='row'>
                  <Typography
                    component='h2'
                    sx={{ mr: 1 }}>
                    Price:
                  </Typography>
                  <Typography component='h2'>
                    {description.price == 0 ? 'Free' : description.price}
                  </Typography>
                </Stack>

                <Typography
                  variant='body1'
                  sx={{ mb: 1 }}>
                  {description.MasterClasses.description}
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        );
      }}
    </Observer>
  );
};

export default MasterClassPreview;
