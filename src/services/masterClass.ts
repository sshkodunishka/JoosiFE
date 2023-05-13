import { DanceStyle } from './dance-style';
import { API_URL, authAxiosInstance } from '.';
import axios from 'axios';

export interface User {
  id: number;
  name: string;
  login: string;
  lastName: string;
  photoLink?: string;
  roleId: number;
  Roles: {
    id: number;
    role: string;
  };
}

export interface MasterClass {
  id: number;
  title: string;
  description: string;
  imageLink: string;
  videoLink: string;
  Users: User;
  creatorId: number;
  ClassesStyles: {
    style: DanceStyle;
  }[];
  Descriptions: Descriptions[];
}

export interface Descriptions {
  id: number;
  classId: number;
  eventDate: string;
  place: string;
  countOfPeople: number;
  price: number;
  MasterClasses: MasterClass;
  Requests: {
    id: number;
    userId: number;
    createdDate: string;
  }[];
}

export type CreateDescription = Omit<
  Descriptions,
  'id' | 'classId' | 'MasterClasses'
> & {
  tempId: number;
};

export type CreateMasterClass = Omit<
  MasterClass,
  'id' | 'Users' | 'ClassesStyles' | 'creatorId'
> & {
  id: number | null;
  danceStylesIds: number[];
};

export type UpdateMasterClass = Omit<MasterClass, 'creator'>;

export const getUpcomingDescriptionsAPI = async ({
  danceStyleId,
  trainerId,
}: {
  danceStyleId?: string;
  trainerId?: string;
}): Promise<Descriptions[]> => {
  try {
    const response = await axios.get(
      `${API_URL}/descriptions?danceStyleId=${danceStyleId}&choreographerId=${trainerId}`
    );
    const descriptions = response.data;
    return descriptions;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getUserDescriptionsAPI = async (
  role: string
): Promise<Descriptions[]> => {
  try {
    const response = await authAxiosInstance.get(
      `${API_URL}/descriptions/${role}`
    );
    const descriptions = response.data;
    return descriptions;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getDescriptionByIdAPI = async (
  id: number
): Promise<Descriptions> => {
  try {
    const response = await axios.get(`${API_URL}/descriptions/${id}`);
    const description = response.data;
    return description;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signUpForClassAPI = async (
  descriptionId: number
): Promise<any> => {
  try {
    const response = await authAxiosInstance.post(
      `${API_URL}/descriptions/${descriptionId}/requests`
    );
    const request = response.data;
    return request;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const cancelClassAPI = async (requestId: number): Promise<any> => {
  try {
    const response = await authAxiosInstance.delete(
      `${API_URL}/requests/${requestId}`
    );
    const request = response.data;
    return request;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createMasterClassAPI = async (masterClass: CreateMasterClass) => {
  try {
    const response = await authAxiosInstance.post(`${API_URL}/master-classes`, {
      title: masterClass.title,
      description: masterClass.description,
      imageLink: masterClass.imageLink,
      videoLink: masterClass.videoLink,
      danceStylesId: masterClass.danceStylesIds,
    });

    const masterClassResp = response.data;
    return masterClassResp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createMasterClassDescriptionAPI = async (
  masterClassId: number,
  description: CreateDescription
): Promise<boolean> => {
  try {
    const response = await authAxiosInstance.post(`${API_URL}/descriptions`, {
      classId: masterClassId,
      countOfPeople: description.countOfPeople,
      eventDate: description.eventDate,
      place: description.place,
      price: description.price,
    });

    const masterClassResp = response.data;
    return masterClassResp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const uploadFileAPI = async (formData: FormData): Promise<string> => {
  try {
    const response = await authAxiosInstance.post(`${API_URL}/files`, formData);
    return response.data.fileUrl;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
