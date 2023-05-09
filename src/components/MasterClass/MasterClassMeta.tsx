import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Avatar, Box, Card, Typography } from '@mui/material';
import { Descriptions, MasterClass } from '@/services/masterClass';

type Props = {
  description: Descriptions;
};

const MasterClassTrainer = observer((props: Props) => {
  const description = props.description;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        p: 1,
      }}>
      <Link to={`/users/${description.MasterClasses.Users.id}`}>
        <Avatar
          sx={{ width: 50, height: 50 }}
          src={description.MasterClasses.Users.photoLink}
          alt=''
        />
      </Link>

      <Box sx={{ ml: 2 }}>
        <Link to={`/users/${description.MasterClasses.Users.id}`}>
          <Typography sx={{ fontWeight: 'bold' }}>
            {description.MasterClasses.Users.name}
          </Typography>
          <Typography sx={{ fontWeight: 'bold' }}>
            {description.MasterClasses.Users.lastName}
          </Typography>
        </Link>
      </Box>
    </Box>
  );
});

export default MasterClassTrainer;
