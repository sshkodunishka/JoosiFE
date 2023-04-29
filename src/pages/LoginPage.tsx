import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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

  const handleEmailChange = (e: any) => authStore.setEmail(e.target.value);
  const handlePasswordChange = (e: any) =>
    authStore.setPassword(e.target.value);
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    authStore
      .login()
      .then(() => props.history.replace('/'))
      .catch(() => {});
  };
  
  useEffect(() => {
    return () => authStore.reset();
  }, [authStore]);

  return (
    <Observer>
      {() => {
        const { values, errors, inProgress } = authStore;
        return (
          <Box
            sx={{ mt: 3 }}>
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
                      label='Email'
                      type='email'
                      variant='outlined'
                      value={values.email}
                      onChange={handleEmailChange}
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