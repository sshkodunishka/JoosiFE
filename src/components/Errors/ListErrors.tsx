import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

type Props = {
  errors?: any[];
};

const ListErrors: React.FC<Props> = (props) => {
  const errors = props.errors;
  if (errors) {
    return (
      <List>
        {Object.values(errors).map((error: any, index) => {
          return (
            <ListItem
              sx={{ color: 'red' }}
              key={index}>
              <ListItemText primary={`${error}`} />
            </ListItem>
          );
        })}
      </List>
    );
  } else {
    return null;
  }
};

export default ListErrors;
