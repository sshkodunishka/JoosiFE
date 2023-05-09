import axios from 'axios';
import { API_URL, authAxiosInstance } from '.';

export interface DanceStyle {
  id: number;
  style: string;
}

export const getAllDanceStylesAPI = async (): Promise<DanceStyle[]> => {
  try {
    const response = await axios.get(`${API_URL}/dance-styles`);
    const danceStyles = response.data;
    return danceStyles;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addDanceStyleAPI = async (style: string): Promise<DanceStyle> => {
  try {
    const response = await authAxiosInstance.post('/dance-styles/', {
      style,
      description: 'temp',
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateDanceStyleAPI = async (
  id: number,
  style: string
): Promise<DanceStyle> => {
  try {
    const response = await authAxiosInstance.put(`/dance-styles/${id}`, {
      style,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteDanceStyleAPI = async (id: number): Promise<DanceStyle> => {
  try {
    const response = await authAxiosInstance.delete(`/dance-styles/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
