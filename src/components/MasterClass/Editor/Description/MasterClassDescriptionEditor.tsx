import { CreateDescription, Descriptions } from '@/services/masterClass';
import { Add, Cancel, Delete, Save } from '@mui/icons-material';
import { Button, Card, IconButton, Stack, TextField } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type Props = {
  onSaveMasterClass: (
    masterClassDetails: CreateDescription | Descriptions
  ) => void;
  onCancel: () => void;
  description?: Descriptions | CreateDescription;
};

const MasterClassDescriptionEditor: React.FC<Props> = (props) => {
  useEffect(() => {
    if (props.description) {
      setEventDate(props.description.eventDate);
      setEventDateISO(props.description.eventDate);
      setPrice(props.description.price);
      setCountOfPeople(props.description.countOfPeople);
      setPlace(props.description.place);
    } else {
      setEventDate('');
      setEventDateISO('');
      setPrice(0);
      setCountOfPeople(1);
      setPlace('');
    }
  }, [props.description]);

  const [eventDate, setEventDate] = useState<string>('');
  const [eventDateISO, setEventDateISO] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [countOfPeople, setCountOfPeople] = useState<number>(1);
  const [place, setPlace] = useState<string>('');

  const changeEventDate = (e: any) => {
    setEventDateISO(dayjs(e).toISOString());
    setEventDate(e);
  };

  const changePrice = (e: any) => {
    setPrice(+e.target.value);
  };

  const changeCountOfPeople = (e: any) => {
    setCountOfPeople(+e.target.value);
  };

  const changePlace = (e: any) => {
    setPlace(e.target.value);
  };

  const isValidPrice = (price: number): boolean => {
    return price >= 0;
  };

  const isValidPeopleAmount = (peopleAmount: number): boolean => {
    return peopleAmount > 0;
  };

  const isValidPlace = (place: string): boolean => {
    return place.trim().length > 0;
  };

  const isButtonDisabled = () => {
    return !(
      eventDateISO &&
      isValidPrice(price) &&
      isValidPeopleAmount(countOfPeople) &&
      isValidPlace(place)
    );
  };

  const handleSaveDescription = () => {
    const details: CreateDescription | Descriptions = {
      eventDate: eventDateISO,
      price,
      countOfPeople,
      place,
      tempId:
        (props.description as CreateDescription)?.tempId ||
        Math.random() * 1000,
    };
    if ((props.description as Descriptions)?.id) {
      (details as unknown as Descriptions).id = (
        props.description as Descriptions
      )?.id;
      (details as any).tempId = undefined;
    }
    props.onSaveMasterClass(details);
  };

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
        <DateTimePicker
          sx={{ mb: 2, mr: 2 }}
          label='Event date'
          value={dayjs(eventDate)}
          onChange={changeEventDate}
          minDateTime={dayjs()}
          format='DD/MM/YYYY HH:mm'
        />
        <TextField
          sx={{ mb: 2, mr: 2 }}
          placeholder='Price'
          type='number'
          error={!isValidPrice(price)}
          helperText={!isValidPrice(price) ? 'Should be >=0' : ''}
          label='Price'
          value={price.toString()}
          onChange={changePrice}
          onBlur={changePrice}
          onKeyDown={changePrice}
          required
        />

        <TextField
          sx={{ mb: 2, mr: 2 }}
          placeholder='Count of people'
          type='number'
          label='People amount'
          error={!isValidPeopleAmount(countOfPeople)}
          helperText={!isValidPeopleAmount(countOfPeople) ? 'Should be >0' : ''}
          value={countOfPeople.toString()}
          onChange={changeCountOfPeople}
          onBlur={changeCountOfPeople}
          onKeyDown={changeCountOfPeople}
          required
        />

        <TextField
          sx={{ mb: 2, mr: 2 }}
          placeholder='Place'
          type='text'
          label='Place'
          value={place}
          onChange={changePlace}
          onBlur={changePlace}
          onKeyDown={changePlace}
          required
        />
      </Stack>
      <Stack
        direction='row'
        sx={{ mb: 2 }}>
        {!props.description && (
          <IconButton
            size='small'
            disabled={isButtonDisabled()}
            color='primary'
            onClick={handleSaveDescription}>
            <Add />
          </IconButton>
        )}
        {props.description && (
          <IconButton
            size='small'
            onClick={handleSaveDescription}>
            <Save />
          </IconButton>
        )}
        {props.description && (
          <IconButton
            size='small'
            onClick={props.onCancel}>
            <Cancel />
          </IconButton>
        )}
      </Stack>
    </Card>
  );
};
export default MasterClassDescriptionEditor;
