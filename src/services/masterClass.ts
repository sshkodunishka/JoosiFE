import { DanceStyle } from './dance-style';

export interface User {
  id: number;
  name: string;
  lastName: string;
  photoLink?: string;
  role: string | number;
}

export interface MasterClass {
  id: number;
  title: string;
  price: number;
  eventDate: string;
  description: string;
  photoLink: string;
  videoLink: string;
  creator: User;
  danceStyles: DanceStyle[];
}

export type CreateMasterClass = Omit<MasterClass, 'id' | 'creator'> & {
  id: number | null;
};

export type UpdateMasterClass = Omit<MasterClass, 'creator'>;
