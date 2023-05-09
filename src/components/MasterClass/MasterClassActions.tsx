import React, { useEffect } from 'react';
import { Link as RouteLink, useNavigate } from 'react-router-dom';
import { Box, Button, IconButton, Link } from '@mui/material';
import { Edit, Delete, RequestPage, Login } from '@mui/icons-material';
import { Descriptions, User } from '@/services/masterClass';

type Props = {
  description: Descriptions;
  currentUser?: User;
  onDelete: (id: number) => void;
  handleSignUp: (id: number) => void;
  handleDescribe: (id: number) => void;
};

const MasterClassActions: React.FC<Props> = (props) => {
  const description = props.description;
  const handleDelete = () => props.onDelete(description.id);
  const navigate = useNavigate();

  useEffect(() => {}, [props.currentUser, description]);

  if (!props.currentUser) {
    return (
      <span>
        <Box sx={{ mr: 1 }}>
          <Button
            variant='outlined'
            size='small'
            onClick={() => navigate('/login')}
            startIcon={<Login />}>
            Login
          </Button>
        </Box>
      </span>
    );
  }
  console.log(description.Requests);
  const request = description.Requests?.find(
    (request) => request.userId === props.currentUser!.id
  );
  const canModify =
    props.currentUser.id === description.MasterClasses.creatorId;
  false;
  const canSignUp = !request;
  console.log(canSignUp);
  if (canModify) {
    return (
      <span>
        <Link
          component={RouteLink}
          to={`/editor/${description.id}`}
          underline='none'
          sx={{ mr: 1 }}>
          <Button
            variant='outlined'
            size='small'
            startIcon={<Edit />}>
            Edit
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

  if (canSignUp) {
    return (
      <Box sx={{ mr: 1 }}>
        <Button
          variant='outlined'
          size='small'
          onClick={() => props.handleSignUp(description.id)}
          startIcon={<RequestPage />}>
          Subscribe
        </Button>
      </Box>
    );
  }
  console.log('here ');
  return (
    <Box sx={{ mr: 1 }}>
      <Button
        variant='outlined'
        size='small'
        onClick={() => props.handleDescribe(description.id)}
        startIcon={<RequestPage />}>
        Describe
      </Button>
    </Box>
  );
};

export default MasterClassActions;
