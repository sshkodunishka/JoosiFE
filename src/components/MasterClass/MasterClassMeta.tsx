import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import MasterClassActions from './MasterClassActions';
import { Avatar, Box, Typography } from '@mui/material';
import { MasterClass } from '@/services/masterClass';

type Props = {
  masterClass: MasterClass
  canModify: boolean
  onDelete: (id: number) => void
}

const MasterClassMeta = observer((props: Props) => {
  const masterClass = props.masterClass;
  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      gap: 2,
      flexWrap: 'wrap',
    }}>
      <Link to={`/@${masterClass.creator.name}`}>
        <Avatar sizes='100px 200px' style={{ borderRadius: 10 }} src={masterClass.creator.photoLink} alt="" />
      </Link>

      <Box sx={{ flex: '1 1 100%' }}>
        <Link to={`/@${masterClass.creator.photoLink}`}>
          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
            {masterClass.creator.name}
          </Typography>
        </Link>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {new Date(masterClass.eventDate).toDateString()}
        </Typography>
      </Box>
    </Box>
  );
});

export default MasterClassMeta;
