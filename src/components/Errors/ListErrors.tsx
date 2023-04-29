import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

type Props = {
  errors?: any[]
}

const ListErrors: React.FC<Props> = props => {
  const errors = props.errors;
  if (errors) {
    return (
      <List>
        {
          Object.keys(errors).map((key: any) => {
            return (
              <ListItem key={key}>
                <ListItemText primary={`${key} ${errors[key]}`} />
              </ListItem>
            );
          })
        }
      </List>
    );
  } else {
    return null;
  }
}

export default ListErrors;
