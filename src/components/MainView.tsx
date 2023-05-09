import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import qsParse from 'query-string';
import { useStore } from '@/store';
import { Box, Tabs } from '@mui/material';
import Tab from '@mui/material/Tab';
import MasterClassList from '@components/MasterClass/MasterClassList';

interface LinkTabProps {
  label?: string;
  href?: string;
  value?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component='a'
      {...props}
    />
  );
}

const MainView: React.FC = () => {
  const location = useLocation();
  const { masterClassStore, commonStore } = useStore();

  let tab: string = (qsParse.parse(location.search).tab as string) || 'all';
  if (Array.isArray(tab)) {
    tab = tab[0];
  }
  const danceStyleId =
    (qsParse.parse(location.search).danceStyle as string) || '';

  const trainerId = (qsParse.parse(location.search).trainer as string) || '';

  const handleSetPage = (page: number) => {
    masterClassStore.setPage(page);
    masterClassStore.loadMasterClasss({ danceStyleId, trainerId });
  };

  useEffect(() => {
    masterClassStore.loadMasterClasss({ danceStyleId, trainerId });
  }, [masterClassStore, tab, danceStyleId, trainerId]);

  return (
    <Observer>
      {() => {
        const { danceStyles, choreographers } = commonStore;
        const { descriptions, isLoading, page, totalPagesCount } =
          masterClassStore;
        return (
          <Box sx={{ width: '100%', height: '100%' }}>
            <Box sx={{ mb: 4 }}>
              <Tabs value={tab}>
                <LinkTab
                  label='All MasterClasss'
                  href='/#/'
                  value='all'
                />
                <LinkTab
                  label='My MasterClasss'
                  href='/#/?tab=my-master-classes'
                  value='my-master-classes'
                />
                {danceStyleId && (
                  <LinkTab
                    label={`#${
                      danceStyles.find((ds) => ds.id == +danceStyleId)?.style ||
                      ''
                    }`}
                    href={`/#/?tab=danceStyle&danceStyle=${danceStyleId}`}
                    value='danceStyle'
                  />
                )}
                {trainerId && (
                  <LinkTab
                    label={`#${
                      choreographers.find((ds) => ds.id == +trainerId)?.name ||
                      ''
                    }`}
                    href={`/#/?tab=trainer&trainer=${trainerId}`}
                    value='trainer'
                  />
                )}
              </Tabs>
            </Box>

            <MasterClassList
              descriptions={descriptions}
              loading={isLoading}
              totalPagesCount={totalPagesCount}
              currentPage={page}
              onSetPage={handleSetPage}
            />
          </Box>
        );
      }}
    </Observer>
  );
};

export default MainView;
