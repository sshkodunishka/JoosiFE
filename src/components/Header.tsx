import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import { User } from '@/services/masterClass';

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
          to='/choreographers'>
          Choreographers
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

const LoggedInView = (props: { currentUser?: User }) => {
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
        {currentUser && (
          <Button
            color='inherit'
            component={RouterLink}
            to='/chat'>
            Chat
          </Button>
        )}
        <Button
          color='inherit'
          component={RouterLink}
          to='/choreographers'>
          Choreographers
        </Button>
        {/* Choreographer menu */}
        {currentUser.Roles.role === 'choreographer' && (
          <Button
            color='inherit'
            component={RouterLink}
            to='/editor'>
            <i className='ion-compose' />
            New master class
          </Button>
        )}
        {/* Admin menu */}
        {currentUser.Roles.role === 'admin' && (
          <Button
            color='inherit'
            component={RouterLink}
            to='/dance-styles/editor'>
            <i className='ion-compose' />
            Dance Styles
          </Button>
        )}
        {currentUser.Roles.role === 'admin' && (
          <Button
            color='inherit'
            component={RouterLink}
            to='/users/'>
            <i className='ion-compose' />
            Users
          </Button>
        )}
        {/* Authorized */}
        <Button
          color='inherit'
          component={RouterLink}
          to={`/profile/`}>
          <Avatar
            src={currentUser.photoLink}
            alt=''
            sx={{ mr: 1 }}
          />
          {currentUser.name}
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
