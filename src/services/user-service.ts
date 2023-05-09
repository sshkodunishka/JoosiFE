import axios from 'axios';
import { API_URL, authAxiosInstance } from '.';
import { User } from './masterClass';

export const getCurrentUserAPI = async (): Promise<User> => {
  try {
    const response = await authAxiosInstance.get('/users/profile');
    const user = {
      id: response.data.id,
      name: response.data.name,
      lastName: response.data.lastName,
      login: response.data.login,
      photoLink: response.data.photoLink,
      Roles: response.data.Roles,
      roleId: response.data.Roles.id,
    };
    return user;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getAllUsersAPI = async (): Promise<User[]> => {
  try {
    const response = await authAxiosInstance.get('/users');
    console.log(response);
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

export const getAllChoreoghraphsAPI = async (): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_URL}/users/choreographers`);
    const users = response.data;
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
