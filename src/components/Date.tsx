import { Box, Stack } from '@mui/material';

type Props = {
  eventDate: string;
  sx?: any;
};

const DateComponent: React.FC<Props> = (props) => {
  return (
    <Stack sx={props.sx}>
      <Box>{new Date(props.eventDate).toDateString()}</Box>
      <Box>{new Date(props.eventDate).toLocaleTimeString().substring(0, 5)}</Box>
    </Stack>
  );
};

export default DateComponent;