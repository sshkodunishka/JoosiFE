import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleNameChange = (e: any) => authStore.setName(e.target.value);
  const handleLastNameChange = (e: any) =>
    authStore.setLastName(e.target.value);
  const handleLoginChange = (e: any) => authStore.setLogin(e.target.value);
  const handlePasswordChange = (e: any) =>
    authStore.setPassword(e.target.value);
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    authStore
      .register()
      .then(() => {
        navigate('/');
      })
      .catch((e) => {
        console.log(e);
      });
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
                  id='name'
                  label='Name'
                  name='name'
                  autoComplete='name'
                  autoFocus
                  value={values.name}
                  onChange={handleNameChange}
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lastName'
                  autoFocus
                  value={values.lastName}
                  onChange={handleLastNameChange}
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='login'
                  label='Login'
                  name='login'
                  autoComplete='login'
                  type='login'
                  value={values.login}
                  onChange={handleLoginChange}
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
                  Sign up
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
