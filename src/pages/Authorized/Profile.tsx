import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

import { useStore } from '../../store';
import { User } from '@/services/masterClass';
import { Edit } from '@mui/icons-material';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { userStore, authStore } = useStore();

  const handleUpdateProfile = () => {
    if (updatingUser) {
      if (!user || userStore.updatingUser) return;
      userStore.updateUser(user);
      setUpdatingUser(false);
    } else {
      setUpdatingUser(true);
    }
  };

  const handleImageUpload = async (event: any) => {
    const file = event.target.files[0];
    await userStore.uploadFile(file);
    if (userStore.currentUser) {
      setCurrentUser(userStore.currentUser);
    }
  };
  const [user, setCurrentUser] = useState<User | null>(null);
  const [updatingUser, setUpdatingUser] = useState<boolean>(false);

  useEffect(() => {
    if (userStore.currentUser) {
      setCurrentUser(userStore.currentUser);
    }
  }, [userStore.currentUser]);

  const isValidName = (name: string): boolean => {
    return name.length > 2;
  };

  const isValidLastName = (lastName: string): boolean => {
    return lastName.length > 2;
  };

  const isButtonDisabled = () => {
    return !(
      isValidName(user?.name || '') && isValidLastName(user?.lastName || '')
    );
  };

  return (
    <Observer>
      {() => {
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
                    {!userStore.updatingUser ? (
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <Avatar
                          sx={{ flexGrow: 0, width: 150, height: 150 }}
                          alt={user.name}
                          src={user.photoLink}
                        />
                        {!updatingUser && (
                          <Box>
                            <input
                              accept='image/jpeg,image/png'
                              style={{ display: 'none' }}
                              id='profile-upload-button'
                              type='file'
                              onChange={handleImageUpload}
                            />
                            <label htmlFor='profile-upload-button'>
                              <IconButton
                                sx={{ alignItems: 'flex-end' }}
                                color='primary'
                                component='span'
                                size='small'>
                                <Edit />
                              </IconButton>
                            </label>{' '}
                          </Box>
                        )}
                      </Box>
                    ) : (
                      <CircularProgress />
                    )}

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
                    sx={{ p: 2, flexGrow: 1, height: '80%', width: '100%' }}>
                    <Stack direction='row'>
                      <TextField
                        sx={{ mb: 2, mr: 2 }}
                        placeholder='name'
                        type='string'
                        label='Name'
                        value={user.name}
                        error={!isValidName(user.name)}
                        helperText={
                          !isValidName(user.name) ? 'Should be >2' : ''
                        }
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const isValidInput = /^[a-zA-Z]+$/.test(inputValue) || inputValue === '';
                          if (isValidInput) {
                            setCurrentUser({ ...user, name: inputValue });
                          }
                        }}
                        required={updatingUser}
                        InputProps={{
                          readOnly: !updatingUser,
                        }}
                      />
                      <TextField
                        sx={{ mb: 2, mr: 2 }}
                        placeholder='last name'
                        type='string'
                        label='Last Name'
                        value={user.lastName}
                        onChange={(event) => {
                          const inputValue = event.target.value;
                          const isValidInput = /^[a-zA-Z]+$/.test(inputValue) || inputValue === '';
                          if (isValidInput) {
                            setCurrentUser({ ...user, lastName: inputValue });
                          }
                        }}
                        error={!isValidName(user.lastName)}
                        helperText={
                          !isValidName(user.lastName) ? 'Should be >2' : ''
                        }
                        InputProps={{
                          readOnly: !updatingUser,
                        }}
                        required={updatingUser}
                      />
                    </Stack>
                    <TextField
                      sx={{ mb: 2, mr: 2 }}
                      type='string'
                      label='Description'
                      value={user.description || ''}
                      onChange={(event) =>
                        setCurrentUser({
                          ...user,
                          description: event.target.value,
                        })
                      }
                      disabled={!updatingUser && !user.description}
                      InputProps={{
                        readOnly: !updatingUser,
                      }}
                    />

                    {!userStore.updatingUser ? (
                      <Box sx={{ mt: 2 }}>
                        {!updatingUser && (
                          <Button
                            variant='contained'
                            onClick={handleUpdateProfile}>
                            Update Profile
                          </Button>
                        )}
                        {updatingUser && (
                          <Button
                            variant='contained'
                            disabled={isButtonDisabled()}
                            onClick={handleUpdateProfile}>
                            Save Profile
                          </Button>
                        )}
                      </Box>
                    ) : (
                      <CircularProgress />
                    )}
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
