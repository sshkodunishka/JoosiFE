import { CreateDescription, Descriptions } from '@/services/masterClass';
import { Delete, Edit } from '@mui/icons-material';
import { Button, Card, IconButton, Stack, TextField } from '@mui/material';

type Props = {
  description: Descriptions | CreateDescription;
  onDelete: (description: Descriptions | CreateDescription) => void;
  onUpdate: (description: Descriptions | CreateDescription) => void;
};

const MasterClassDescription: React.FC<Props> = (props) => {
  const { description } = props;

  return (
    <Card
      sx={{
        p: 1,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        minHeight: '120px',
      }}>
      <Stack
        direction='row'
        sx={{
          p: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TextField
          InputProps={{
            readOnly: true,
          }}
          label='Date'
          type='text'
          value={
            new Date(description.eventDate).toLocaleDateString() +
            ' ' +
            new Date(description.eventDate)
              .toLocaleTimeString()
              .split(':')
              .slice(0, 2)
              .join(':')
          }
          sx={{ mb: 2, mr: 2, cursor: 'default' }}
        />
        <TextField
          InputProps={{
            readOnly: true,
          }}
          sx={{ mb: 2, mr: 2, cursor: 'default' }}
          placeholder='Price'
          type='number'
          label='Price'
          value={description.price}
        />

        <TextField
          InputProps={{
            readOnly: true,
          }}
          sx={{ mb: 2, mr: 2, cursor: 'default' }}
          placeholder='Count of people'
          type='number'
          label='People amount'
          value={description.countOfPeople}
        />

        <TextField
          InputProps={{
            readOnly: true,
          }}
          sx={{ mb: 2, mr: 2, cursor: 'default' }}
          placeholder='Place'
          type='text'
          label='Place'
          value={description.place}
        />
      </Stack>
      <IconButton
        size='small'
        onClick={() => props.onUpdate(description)}>
        <Edit />
      </IconButton>
      <IconButton
        size='small'
        onClick={() => props.onDelete(description)}>
        <Delete />
      </IconButton>
    </Card>
  );
};
export default MasterClassDescription;
