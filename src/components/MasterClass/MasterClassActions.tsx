import React from 'react';
import { Link as RouteLink } from 'react-router-dom';
import { Button, IconButton, Link } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { MasterClass } from '@/services/masterClass';

type Props = {
  masterClass: MasterClass;
  canModify: boolean;
  onDelete: (id: number) => void;
};

const MasterClassActions: React.FC<Props> = (props) => {
  const masterClass = props.masterClass;
  const handleDelete = () => props.onDelete(masterClass.id);

  if (true || props.canModify) {
    return (
      <span>
        <Link
          component={RouteLink}
          to={`/editor/${masterClass.id}`}
          underline='none'
          sx={{ mr: 1 }}>
          <Button
            variant='outlined'
            size='small'
            startIcon={<Edit />}>
            Edit Article
          </Button>
        </Link>

        <IconButton
          size='small'
          onClick={handleDelete}>
          <Delete />
        </IconButton>
      </span>
    );
  }

  return <span />;
};

export default MasterClassActions;
