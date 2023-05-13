import React, { useEffect } from 'react';
import { Routes, Route, HashRouter as Router } from 'react-router-dom';
import { useStore } from '@/store'; // importing module using path alias
import LoginPage from '@pages/LoginPage';
import Header from '@components/Header';
import RegisterPage from '@pages/RegisterPage';
import HomePage from '@pages/HomePage';
import MasterClass from '@pages/MasterClass';
import { Box, CircularProgress, Toolbar } from '@mui/material';
import Footer from '@components/Footer';
import ProtectedRoute from '@components/ProtectedRoute';
import Editor from '@pages/Сhoreographer/MasterClassEditor';
import AdminDanceStyles from '@pages/Admin/DanceStyles';
import AdminUsers from '@pages/Admin/Users';
import { Observer } from 'mobx-react-lite';
import ProfilePage from '@pages/Authorized/Profile';
import ChoreographersPage from '@pages/ChoreographersPage';
import ChoreographerPage from '@pages/ChoreographerPage';
import ChatPage from '@pages/Authorized/Chat';

const App: React.FC = () => {
  const { commonStore, userStore, chatStore } = useStore();

  useEffect(() => {
    if (commonStore.accessToken) {
      if (userStore.loadingUser) {
        return;
      }
      userStore.pullUser().finally(() => {
        commonStore.setAppLoaded();
      });
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore.accessToken]);

  return (
    <Observer>
      {() =>
        commonStore.appLoaded ? (
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
                  <Route
                    path='/choreographers/:id'
                    element={<ChoreographerPage />}
                  />
                  <Route
                    path='/choreographers'
                    element={<ChoreographersPage />}
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
                  {/* Authorized */}
                  <Route
                    path='/profile/'
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path='/chat/'
                    element={
                      <ProtectedRoute>
                        <ChatPage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                <Footer />
              </Box>
            </Box>
          </Router>
        ) : (
          <CircularProgress />
        )
      }
    </Observer>
  );
};

export default App;
