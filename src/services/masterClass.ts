export interface DanceStyle {
  id: number, 
  name: string
}

export interface User {
  id: number;
  name: string;
  lastName: string;
  photoLink: string;
}

export interface MasterClass {
  id: number;
  title: string;
  eventDate: string;
  description: string;
  photoLink: string;
  videoLink: string;
  creator: User;
  danceStyles: DanceStyle[]
}
