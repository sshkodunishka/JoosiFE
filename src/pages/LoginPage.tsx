import React, { useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import ListErrors from '@components/Errors/ListErrors';
import {
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Box,
  Grid,
} from '@mui/material';

const Login = (props: any) => {
  const { authStore } = useStore();
  const navigate = useNavigate();
  const handleLoginChange = (e: any) => authStore.setLogin(e.target.value);
  const handlePasswordChange = (e: any) =>
    authStore.setPassword(e.target.value);
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    authStore
      .login()
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

  return (
    <Observer>
      {() => {
        const { values, errors, inProgress } = authStore;
        return (
          <Box sx={{ mt: 15, height: '100%' }}>
            <Container maxWidth='sm'>
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant='h3'
                  component='h1'
                  align='center'>
                  Sign In
                </Typography>
                <Typography
                  variant='body1'
                  align='center'>
                  <Link
                    color={'primary'}
                    component={RouterLink}
                    to='/register'>
                    Need an account?
                  </Link>
                </Typography>
              </Box>

              <ListErrors errors={errors} />

              <Box
                component='form'
                onSubmit={handleSubmitForm}>
                <Grid
                  container
                  spacing={2}>
                  <Grid
                    item
                    xs={12}>
                    <TextField
                      fullWidth
                      label='Login'
                      type='text'
                      variant='outlined'
                      value={values.login}
                      onChange={handleLoginChange}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}>
                    <TextField
                      fullWidth
                      label='Password'
                      type='password'
                      variant='outlined'
                      value={values.password}
                      onChange={handlePasswordChange}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}>
                    <Button
                      fullWidth
                      variant='contained'
                      color='primary'
                      type='submit'
                      disabled={inProgress}>
                      Sign in
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Container>
          </Box>
        );
      }}
    </Observer>
  );
};

export default Login;
