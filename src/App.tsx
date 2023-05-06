import React, { useEffect } from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import { useStore } from '@/store'; // importing module using path alias
import LoginPage from '@pages/LoginPage';
import Header from '@components/Header';
import RegisterPage from '@pages/RegisterPage';
import HomePage from '@pages/HomePage';
import MasterClass from '@components/MasterClass/MasterClass';
import { Box, Toolbar } from '@mui/material';
import Footer from '@components/Footer';
import ProtectedRoute from '@components/ProtectedRoute';
import Editor from '@pages/Сhoreographer/MasterClassEditor';
import AdminDanceStyles from '@pages/Admin/DanceStyles';
import AdminUsers from '@pages/Admin/Users';

const App: React.FC = () => {
  const { commonStore, userStore } = useStore();
  useEffect(() => {
    console.log(commonStore.accessToken);
    if (commonStore.accessToken) {
      userStore.pullUser().finally(() => commonStore.setAppLoaded());
    }
  });

  return (
    <Router>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          left: 0,
          top: 0,
          width: '100%',
        }}>
        <Header />
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Toolbar />
          <Routes>
            <Route
              path='/'
              element={<HomePage />}
            />
            <Route
              path='/login'
              element={<LoginPage />}
            />
            <Route
              path='/register'
              element={<RegisterPage />}
            />
            <Route
              path='/master-classes/:id'
              element={<MasterClass />}
            />
            {/* choreographer */}
            <Route
              path='/editor/:id?'
              element={
                <ProtectedRoute requiredRole='choreographer'>
                  <Editor />
                </ProtectedRoute>
              }
            />
            {/* admin  */}
            <Route
              path='/dance-styles/editor/:id?'
              element={
                <ProtectedRoute requiredRole='admin'>
                  <AdminDanceStyles />
                </ProtectedRoute>
              }
            />
            <Route
              path='/users/'
              element={
                <ProtectedRoute requiredRole='admin'>
                  <AdminUsers />
                </ProtectedRoute>
              }
            />

            {/* <PrivateRoute path="/settings" component={Settings} />
        <Route path="/@:username" component={Profile} />
        <Route path="/@:username/favorites" component={Profile} />
        <Route path="/article/:slug" component={Article} />
        <Route path="/editor/:slug?" component={Editor} />
       */}
          </Routes>
          <Footer />
        </Box>
      </Box>
    </Router>
  );
};

export default App;
