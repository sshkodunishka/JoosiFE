import {
  Box,
  Chip,
  InputLabel,
  MenuItem,
  Select,
  Theme,
  useTheme,
} from '@mui/material';
import { useStore } from '@/store';
import { DanceStyle } from '@/services/dance-style';
import { useEffect, useState } from 'react';
import { runInAction } from 'mobx';

interface Props {
  allDanceStyles: DanceStyle[];
}

const DanceStyleSelect: React.FC<Props> = () => {
  const theme = useTheme();
  const { editorStore, commonStore } = useStore();
  const [danceStyles, setDanceStyles] = useState<DanceStyle[]>([]);

  useEffect(() => {
    setDanceStyles(editorStore.danceStyles);
  }, [editorStore.danceStyles]);

  const { danceStyles: allDanceStyles } = commonStore;

  const handleChange = (event: any) => {
    let selectedDanceStyles = [...danceStyles];
    const selectedDanceStylesIds = selectedDanceStyles.map((ds) => ds.id);
    for (let value of event.target.value) {
      if (typeof value !== 'number') {
        continue;
      }
      const selectedStyle: DanceStyle = commonStore.danceStyles.find(
        (ds) => ds.id === value
      )!;
      if (selectedDanceStylesIds.includes(selectedStyle.id)) {
        // If the style is already selected, remove it
        selectedDanceStyles = selectedDanceStyles.filter(
          (ds) => ds.id !== selectedStyle.id
        );
      } else {
        // If the style is not already selected, add it
        selectedDanceStyles.push(selectedStyle);
      }
    }
      editorStore.setDanceStyles(selectedDanceStyles);
  };

  const getStyles = (id: number, danceStyles: DanceStyle[], theme: Theme) => {
    const isSelected = danceStyles.map((ds) => ds.id).indexOf(id) !== -1;
    return {
      fontWeight: isSelected
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
      backgroundColor: isSelected
        ? theme.palette.secondary.light
        : theme.palette.background.paper,
    };
  };

  return (
    <Box
      sx={{
        alignItems: 'center',
        mr: 4,
      }}>
      <InputLabel id='dance-style-label'>Dance Styles</InputLabel>
      <Select
        labelId='dance-style-label'
        id='dance-style-select'
        value={danceStyles}
        onChange={handleChange}
        multiple
        sx={{ minWidth: 200 }}
        renderValue={(selected) => (
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value.id}
                label={value.style}
              />
            ))}
          </Box>
        )}>
        {allDanceStyles.map((danceStyle) => (
          <MenuItem
            key={danceStyle.id}
            value={danceStyle.id}
            style={getStyles(danceStyle.id, danceStyles, theme)}>
            {danceStyle.style}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default DanceStyleSelect;
