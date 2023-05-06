import axios from 'axios';
import { API_URL } from '.';

export const loginAPI = async (login: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      login,
      password,
    });
    const authTokens = response.data;
    return authTokens;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const registerAPI = async (
  name: string,
  lastName: string,
  login: string,
  password: string
) => {
  try {
    const response = await axios.post(`${API_URL}/auth/registration`, {
      name,
      lastName,
      login,
      password,
    });
    const authTokens = response.data;
    return authTokens;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

