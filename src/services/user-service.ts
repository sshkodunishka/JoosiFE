import axios from 'axios';
import { API_URL, authAxiosInstance } from '.';
import { User, MasterClass } from './masterClass';

export interface Choreographers extends User {
  MasterClasses: MasterClass[];
  description: string;
}

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
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const getAllChoreoghraphsAPI = async (): Promise<Choreographers[]> => {
  try {
    const response = await axios.get(`${API_URL}/users/choreographers`);
    const users = response.data;
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getOneChoreoghrapherAPI = async (
  id: number
): Promise<Choreographers> => {
  try {
    const response = await axios.get(`${API_URL}/users/choreographers/${id}`);
    const users = response.data;
    return users;
  } catch (error: any) {
    console.log(error);
    throw error.response.data.message;
  }
};
