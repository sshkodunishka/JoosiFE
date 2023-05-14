import React, { useEffect } from 'react';
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

  useEffect(() => {
    authStore.reset();
  }, [authStore]);

  const isValidName = (name: string): boolean => {
    return name.length > 2;
  };

  const isValidLogin = (login: string): boolean => {
    return login.length > 3;
  };

  const isValidPassword = (password: string): boolean => {
    // const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/; // 1 -number, 1 letter and >4 length
    // return pattern.test(password);
    return password.length > 3;
  };

  return (
    <Observer>
      {() => {
        const { values, errors, inProgress } = authStore;
        const isButtonDisabled = () => {
          return !(
            isValidName(values?.name || '') &&
            isValidName(values.lastName || '') &&
            values.login &&
            values.password
          );
        };

        return (
          <Container
            sx={{ mt: 15, height: '100%' }}
            maxWidth='sm'>
            <Box
              sx={{
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
                  color={'primary'}
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
                  error={!!values.name && !isValidName(values.name)}
                  helperText={
                    !!values.name && !isValidName(values.name)
                      ? 'Should be >2'
                      : ''
                  }
                  value={values.name}
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    const isValidInput =
                      /^[a-zA-Z]+$/.test(inputValue) || inputValue === '';
                    if (isValidInput) {
                      authStore.setName(inputValue);
                    }
                  }}
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='lastName'
                  value={values.lastName}
                  error={!!values.lastName && !isValidName(values.lastName)}
                  helperText={
                    values.lastName && !isValidName(values.lastName)
                      ? 'Should be >2'
                      : ''
                  }
                  onChange={(event) => {
                    const inputValue = event.target.value;
                    const isValidInput =
                      /^[a-zA-Z]+$/.test(inputValue) || inputValue === '';
                    if (isValidInput) {
                      authStore.setLastName(inputValue);
                    }
                  }}
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
                  error={!!values.login && !isValidLogin(values.login)}
                  helperText={
                    values.login && !isValidLogin(values.login)
                      ? 'Should be >3'
                      : ''
                  }
                />

                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  value={values.password}
                  onChange={handlePasswordChange}
                  error={!!values.password && !isValidPassword(values.password)}
                  helperText={
                    !!values.password && !isValidPassword(values.password)
                      ? 'Should be >3'
                      : ''
                  }
                />

                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}
                  disabled={inProgress || isButtonDisabled()}>
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
