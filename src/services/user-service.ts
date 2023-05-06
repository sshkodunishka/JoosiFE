import { authAxiosInstance } from '.';
import { User } from './masterClass';

export const getCurrentUserAPI = async (): Promise<User> => {
  try {
    const response = await authAxiosInstance.get('/users');
    const user = {
      id: 1,
      name: 'Kristina',
      lastName: 'Shkoda',
      login: 'kristina',
      photoLink: '',
      role: {
        id: 1,
        name: 'admin',
      },
    };
    console.log(user);
    return { ...user, role: user.role.name };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getAllUsersAPI = async (): Promise<User[]> => {
  try {
    const response = await authAxiosInstance.get('/users');
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const changeUserRoleAPI = async (userId: number): Promise<boolean> => {
  try {
    const response = await authAxiosInstance.post(
      '/users/becomeChoreographer',
      {
        id: userId,
      }
    );
    return true;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
