import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '../store';
import ListErrors from '@components/Errors/ListErrors';
import {
  TextField,
  Button,
  Container,
  Box,
  Typography,
  Link,
} from '@mui/material';

const Register: React.FC = (props: any) => {
  const { authStore } = useStore();
  const handleUsernameChange = (e: any) =>
    authStore.setUsername(e.target.value);
  const handleEmailChange = (e: any) => authStore.setEmail(e.target.value);
  const handlePasswordChange = (e: any) =>
    authStore.setPassword(e.target.value);
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    authStore
      .register()
      .then(() => props.history.replace('/'))
      .catch(() => {});
  };

  return (
    <Observer>
      {() => {
        const { values, errors, inProgress } = authStore;

        return (
          <Container maxWidth='sm'>
            <Box
              sx={{
                marginTop: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
              <Typography
                component='h1'
                variant='h4'>
                Sign Up
              </Typography>
              <Typography
                variant='body2'
                color='text.secondary'
                align='center'>
                <Link
                  component={RouterLink}
                  to='/login'>
                  Have an account?
                </Link>
              </Typography>

              <ListErrors errors={errors} />

              <Box
                component='form'
                onSubmit={handleSubmitForm}
                sx={{ mt: 3 }}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='username'
                  label='Username'
                  name='username'
                  autoComplete='username'
                  autoFocus
                  value={values.username}
                  onChange={handleUsernameChange}
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='email'
                  label='Email'
                  name='email'
                  autoComplete='email'
                  type='email'
                  value={values.email}
                  onChange={handleEmailChange}
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='current-password'
                  value={values.password}
                  onChange={handlePasswordChange}
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={inProgress}>
                  Sign in
                </Button>
              </Box>
            </Box>
          </Container>
        );
      }}
    </Observer>
  );
};

export default Register;
