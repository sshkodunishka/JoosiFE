import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';

const LoggedOutView = (props: any) => {
  const { currentUser } = props;
  if (!currentUser) {
    return (
      <Stack
        direction='row'
        spacing={2}
        alignItems='flex-start'>
        <Button
          color='inherit'
          component={RouterLink}
          to='/'>
          Home
        </Button>
        <Button
          color='inherit'
          component={RouterLink}
          to='/login'>
          Sign in
        </Button>
        <Button
          color='inherit'
          component={RouterLink}
          to='/register'>
          Sign up
        </Button>
      </Stack>
    );
  }
  return null;
};

const LoggedInView = (props: any) => {
  const { currentUser } = props;
  if (currentUser) {
    return (
      <Stack
        direction='row'
        spacing={2}
        alignItems='center'>
        <Button
          color='inherit'
          component={RouterLink}
          to='/'>
          Home
        </Button>
        <Button
          color='inherit'
          component={RouterLink}
          to='/add-masterclass'>
          <i className='ion-compose' />
          New master class
        </Button>
        <Button
          color='inherit'
          component={RouterLink}
          to='/settings'>
          <i className='ion-gear-a' />
          Profile
        </Button>
        <Button
          color='inherit'
          component={RouterLink}
          to={`/@${currentUser.username}`}>
          <Avatar
            src={currentUser.image}
            alt=''
            sx={{ mr: 1 }}
          />
          {currentUser.username}
        </Button>
      </Stack>
    );
  }

  return null;
};

const Header = () => {
  const { commonStore, userStore } = useStore();
  return (
    <Observer>
      {() => (
        <AppBar>
          <Toolbar>
            <Typography
              variant='h6'
              component={RouterLink}
              to='/'
              color='inherit'
              sx={{ flexGrow: 1, textDecoration: 'none', fontSize: 14 }}>
              {commonStore.appName.toUpperCase()}
            </Typography>

            <LoggedOutView currentUser={userStore.currentUser} />
            <LoggedInView currentUser={userStore.currentUser} />
          </Toolbar>
        </AppBar>
      )}
    </Observer>
  );
};

export default Header;
