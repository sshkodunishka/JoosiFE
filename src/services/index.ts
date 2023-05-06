import commonStore from '../stores/commonStore';
import axios from 'axios';
export const API_URL = 'http://localhost:5000';

export const authAxiosInstance = axios.create({
  baseURL: API_URL,
});

authAxiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${commonStore.accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
