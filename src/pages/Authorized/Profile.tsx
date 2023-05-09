import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import { useStore } from '../../store';

interface User {
  id: number;
  name: string;
  email: string;
}

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { userStore, authStore } = useStore();
  const handleUpdateProfile = () => {
    console.log('handle update profile');
  };
  return (
    <Observer>
      {() => {
        const { currentUser } = userStore;
        const { logout } = authStore;
        const handleLogOut = () => {
          logout().then(() => navigate('/'));
        };
        if (!currentUser) return null;

        return (
          <Box
            sx={{
              mt: 2,
              mb: 1,
              width: '60%',
              height: '100%',
            }}>
            <Card
              sx={{
                display: 'flex',
                height: '80%',
              }}>
              <CardContent sx={{ width: '100%' }}>
                <Typography
                  textAlign='center'
                  width='100%'
                  variant='h4'>
                  Profile
                </Typography>
                <Divider sx={{ mb: 2, mt: 2 }} />

                {/* Content */}
                <Stack
                  sx={{
                    mt: 3,
                    ml: 3,
                    height: '100%',
                    justifyContent: 'space-between',
                  }}
                  direction='row'>
                  <Card
                    sx={{
                      width: '30%',
                      minWidth: '200px',
                      minHeight: '250px',
                      height: '50%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mr: 3,
                      p: 2,
                    }}>
                    <Avatar
                      sx={{ flexGrow: 0, width: 150, height: 150 }}
                      alt={currentUser.name}
                      src={currentUser.photoLink}
                    />

                    <Box sx={{ mt: 2, mb: 1 }}>
                      <Button
                        variant='contained'
                        onClick={handleLogOut}>
                        Sign Out
                      </Button>
                    </Box>
                  </Card>

                  {/* Description */}
                  <Card
                    sx={{ p: 1, flexGrow: 1, height: '80%', width: '100%' }}>
                    <Stack
                      direction='row'
                      spacing={2}>
                      <Box sx={{ typography: 'body1' }}>Name:</Box>
                      <Box sx={{ typography: 'body1' }}>{currentUser.name}</Box>
                    </Stack>
                    <Stack
                      direction='row'
                      spacing={2}>
                      <Box sx={{ typography: 'body1' }}>Last Name:</Box>
                      <Box sx={{ typography: 'body1' }}>
                        {currentUser.lastName}
                      </Box>
                    </Stack>
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant='contained'
                        onClick={handleUpdateProfile}>
                        Update Profile
                      </Button>
                    </Box>
                  </Card>
                </Stack>
              </CardContent>
            </Card>
          </Box>
        );
      }}
    </Observer>
  );
};

export default ProfilePage;
