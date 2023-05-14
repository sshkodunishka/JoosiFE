import commonStore from '../stores/commonStore';
import axios from 'axios';

export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000/api'
    : '/api';

export const WS_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : '/';

export const authAxiosInstance = axios.create({
  baseURL: API_URL,
});

authAxiosInstance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${commonStore.accessToken}`;
    return config;
  },
  async (err) => {
    return Promise.reject(err);
  }
);

authAxiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    if (!err.config) {
      return Promise.reject(err);
    }

    const originalConfig = err.config;
    if (originalConfig.url !== '/auth/login' && err.response) {
      // Access Token was expired
      if (
        err.response.data.message === 'user is not authorized' &&
        !originalConfig._retry
      ) {
        originalConfig._retry = true;
        try {
          const response = await authAxiosInstance.post(
            `/auth/refresh-token`,
            {
              refreshToken: commonStore.refreshToken,
            }
          );
          commonStore.setTokens(
            response.data.acsess_token,
            response.data.refresh_token
          );
          axios.defaults.headers.Authorization = `Bearer ${response.data.acsess_token}`;
          return authAxiosInstance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);
