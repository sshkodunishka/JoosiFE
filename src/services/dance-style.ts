import axios from 'axios';
import { API_URL, authAxiosInstance } from '.';

export interface DanceStyle {
  id: number;
  style: string;
}

export const getAllDanceStylesAPI = async (): Promise<DanceStyle[]> => {
  try {
    const response = await axios.get(`${API_URL}/danceStyles`);
    const danceStyles = response.data;
    return danceStyles;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addDanceStyleAPI = async (
  style: string
): Promise<DanceStyle> => {
  try {
    const response = await authAxiosInstance.post('/danceStyles/cteateStyle', {
      style,
      description: 'temp',
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
