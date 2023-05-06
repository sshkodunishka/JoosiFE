import React, { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Observer } from 'mobx-react-lite';
import qsParse from 'query-string';
import { useStore } from '@/store';
// import MasterClassList from '../MasterClassList';
import { Box, Tabs, Typography } from '@mui/material';
import { isAction } from 'mobx';
import Tab from '@mui/material/Tab';
import MasterClassList from '@components/MasterClass/MasterClassList';
import { DanceStyle } from '@/services/dance-style';

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
// const GlobalFeedTab = (props: any) => {
//   return (
//     <LinkTab label="Page One" href="/drafts" />
//     <Tab
//       label='Global Feed'
//       component={NavLink}
//       to={{
//         pathname: '/',
//         search: '?tab=all',
//       }}
//       selected={!location.search.match(/tab=(feed|danceStyle)/)}
//     />
//   );
// };

const DanceStyleFilterTab = (props: any) => {
  console.log('12');
  if (!props.danceStyle) {
    return null;
  }
  console.log('12');
  return (
    <Typography
      component='li'
      className='nav-item'>
      <Typography
        component='a'
        href=''
        className='nav-link active'>
        <Typography
          component='i'
          className='ion-pound'
          sx={{ mr: 0.5 }}
        />
        {props.danceStyle}
      </Typography>
    </Typography>
  );
};

function a11yProps(index: string) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const MainView: React.FC = () => {
  const location = useLocation();
  const { masterClassStore, userStore } = useStore();

  let tab: string = (qsParse.parse(location.search).tab as string) || 'all';
  if (Array.isArray(tab)) {
    tab = tab[0];
  }
  const danceStyle =
    (qsParse.parse(location.search).danceStyle as string) || '';
  const getPredicate = useCallback((tab: any, danceStyle: any) => {
    switch (tab) {
      case 'feed':
        return { myFeed: true };
      case 'danceStyle':
        return { danceStyle };
      default:
        return {};
    }
  }, []);

  const handleSetPage = (page: number) => {
    masterClassStore.setPage(page);
    masterClassStore.loadMasterClasss();
  };

  useEffect(() => {
    // articleStore.setPredicate(getPredicate(tab, danceStyle));
    masterClassStore.loadMasterClasss();
  }, [masterClassStore, getPredicate, tab, danceStyle]);

  return (
    <Observer>
      {() => {
        const { currentUser } = userStore;
        const { masterClasss, isLoading, page, totalPagesCount } =
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
                  value='my-masterClasss'
                />
                {danceStyle && (
                  <LinkTab
                    label={`#${danceStyle}`}
                    href={`/#/?tab=danceStyle&dance-style=${danceStyle}`}
                    value='danceStyle'
                  />
                )}
              </Tabs>
            </Box>

            <MasterClassList
              masterClasss={masterClasss}
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
