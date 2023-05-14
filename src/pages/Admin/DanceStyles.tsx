import { DanceStyle } from '@/services/dance-style';
import { useStore } from '@/store';
import { Close } from '@mui/icons-material';
import { Box, IconButton, Input } from '@mui/material';
import { Observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

const AdminDanceStyles: React.FC = () => {
  const { danceStyleStore } = useStore();

  useEffect(() => {
    if (danceStyleStore.inProgress) {
      return;
    }
    danceStyleStore.loadInitialData();
  }, [danceStyleStore]);

  const [danceStyleInput, setDanceStyle] = useState<string>('');
  const [selectedDanceStyle, setSelectedDanceStyle] = useState<DanceStyle>();

  const handleSelectDanceStyle = (danceStyle: DanceStyle) => {
    setSelectedDanceStyle(danceStyle);
    setDanceStyle(danceStyle.style);
  };

  const changeDanceStyleInput = (e: any) => setDanceStyle(e.target.value);
  const handleSaveDanceStyle = () => {
    if (danceStyleInput === '' || danceStyleInput.trim() === '') return;
    if (selectedDanceStyle) {
      danceStyleStore.updateDanceStyle(
        selectedDanceStyle.id,
        danceStyleInput.trim()
      );
    } else if (danceStyleInput) {
      danceStyleStore.addDanceStyle(danceStyleInput.trim());
    }
    setDanceStyle('');
    setSelectedDanceStyle(undefined);
  };

  const handleRemoveDanceStyle = (ev: any, id: number) => {
    ev.stopPropagation();
    if (danceStyleStore.inProgress) return;
    danceStyleStore.removeDanceStyle(id);
    setSelectedDanceStyle(undefined);
    setDanceStyle('');
  };

  const handleDanceStyleInputKeyDown = (ev: any) => {
    switch (ev.keyCode) {
      case 13: // Enter
      case 9: // Tab
      case 188: // ,
        if (ev.keyCode !== 9) ev.preventDefault();
        handleSaveDanceStyle();
        break;
      default:
        break;
    }
  };

  return (
    <Observer>
      {() => {
        const { inProgress, danceStyles } = danceStyleStore;

        return (
          <Box
            sx={{
              backgroundColor: '#EE82EE',
              m: 2,
              width: '80%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Input
              sx={{ mb: 2 }}
              placeholder='Enter danceStyles'
              value={danceStyleInput}
              onChange={changeDanceStyleInput}
              onBlur={handleSaveDanceStyle}
              onKeyDown={handleDanceStyleInputKeyDown}
              disabled={inProgress}
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', maxWidth: '70%' }}>
              {danceStyles?.map((danceStyle) => {
                return (
                  <Box
                    key={danceStyle.id}
                    onClick={() => handleSelectDanceStyle(danceStyle)}
                    sx={{
                      backgroundColor: '#f0f0f0',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '4px 8px',
                      margin: '0 8px 8px 0',
                      cursor: 'pointer',
                    }}>
                    <IconButton
                      size='small'
                      sx={{ ml: 1, mr: 0.5 }}
                      onClick={(e) => handleRemoveDanceStyle(e, danceStyle.id)}>
                      <Close fontSize='small' />
                    </IconButton>
                    {danceStyle.style}
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      }}
    </Observer>
  );
};

export default AdminDanceStyles;
