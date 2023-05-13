import { useStore } from '@/store';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const AdminUsers: React.FC = () => {
  const { usersStore } = useStore();

  useEffect(() => {
    if (usersStore.inProgress) {
      return;
    }
    usersStore.loadInitialData();
  }, [usersStore]);
  return (
    <Observer>
      {() => {
        const { users, inProgress } = usersStore;
        if (inProgress) {
          return <CircularProgress />;
        }
        return (
          <Box sx={{ width: '80%', height: '100%', mt: 3 }}>
            <TableContainer component={Paper}>
              <Table
                sx={{ minWidth: 550 }}
                aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>User Id</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Last Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Role</TableCell>
                    <TableCell
                      sx={{ fontWeight: 'bold' }}
                      align='right'>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => {
                    if (user.Roles.role !== 'admin')
                      return (
                        <TableRow
                          key={user.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}>
                          <TableCell>{user.name}</TableCell>
                          <TableCell>{user.lastName}</TableCell>
                          <TableCell>{user.roleId}</TableCell>
                          <TableCell>{user.Roles.role}</TableCell>
                          <TableCell align='right'>
                            {user.Roles.role === 'user' && (
                              <Box>
                                <Button
                                  onClick={() => {
                                    usersStore.changeUserRole(user.id);
                                  }}>
                                  Make a choreographer
                                </Button>
                              </Box>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        );
      }}
    </Observer>
  );
};

export default AdminUsers;
