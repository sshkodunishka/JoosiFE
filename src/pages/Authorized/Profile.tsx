import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useStore } from '../../store';
import { User } from '@/services/masterClass';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { userStore, authStore } = useStore();
  const handleUpdateProfile = () => {
    console.log('handle update profile');
  };

  useEffect(() => {
    if (userStore.currentUser) {
      setCurrentUser(userStore.currentUser);
    }
  }, [userStore.currentUser]);

  const [user, setCurrentUser] = useState<User | null>(null);

  return (
    <Observer>
      {() => {
        const { updatingUser } = userStore;
        const { logout } = authStore;
        const handleLogOut = () => {
          logout().then(() => navigate('/'));
        };
        if (!user) return null;

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
                      alt={user.name}
                      src={user.photoLink}
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
                      <TextField
                        sx={{ mb: 2, mr: 2 }}
                        placeholder='Count of people'
                        type='string'
                        label='Name'
                        value={user.name}
                        onChange={() =>
                          setCurrentUser({ ...user, name: user.name })
                        }
                        required={updatingUser}
                      />
                    </Stack>
                    <Stack
                      direction='row'
                      spacing={2}>
                      <Box sx={{ typography: 'body1' }}>Last Name:</Box>
                      <Box sx={{ typography: 'body1' }}>
                        {user.lastName}
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
