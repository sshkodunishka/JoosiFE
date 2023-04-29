import React, { useEffect } from 'react';
import { Observer } from 'mobx-react-lite';
import { useStore } from '@/store';
import { Box, Grid, Typography } from '@mui/material';
import MainView from '@components/MainView';
import DanceStyles from '@components/DanceStyles';

const Home: React.FC = () => {
  const { commonStore } = useStore();

  useEffect(() => {
    async function loadDanceStyles() {
      await commonStore.loadDanceStyles();
    }
    loadDanceStyles();
  }, [commonStore]);

  return (
    <Observer>
      {() => {
        const { appName, isLoadingDanceStyles, danceStyles, token } =
          commonStore;
        return (
          <Box>
            {/* <Banner
              token={token}
              appName={appName}
            /> */}
            <Grid
              sx={{ height: '100%' }}
              container
              wrap='nowrap'>
              <Grid
                item
                xs={12}
                sx={{ p: 2, m: 3 }}
                md={9}>
                <MainView />
              </Grid>

              <Grid
                item
                xs={12}
                md={3}>
                <Box sx={{ bgcolor: '#f5f5f5', p: 2, m: 3, borderRadius: 3 }}>
                  <Typography sx={{ p: 1 }}>Dance Styles</Typography>
                  <DanceStyles
                    loading={isLoadingDanceStyles}
                    danceStyles={danceStyles}
                  />
                </Box>
              </Grid>
            </Grid>
          </Box>
        );
      }}
    </Observer>
  );
};

export default Home;
