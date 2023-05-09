import { DanceStyle, getAllDanceStylesAPI } from '@/services/dance-style';
import { User } from '@/services/masterClass';
import { getAllChoreoghraphsAPI } from '@/services/user-service';
import {
  observable,
  action,
  reaction,
  makeObservable,
  runInAction,
} from 'mobx';

export class CommonStore {
  appName = 'Joose';
  accessToken = window.localStorage.getItem('accessToken');
  refreshToken = window.localStorage.getItem('refreshToken');
  appLoaded = false;
  danceStyles: DanceStyle[] = [];
  choreographers: User[] = [];
  isLoadingDanceStyles = false;

  constructor() {
    makeObservable(this, {
      appName: observable,
      accessToken: observable,
      refreshToken: observable,
      appLoaded: observable,
      danceStyles: observable,
      isLoadingDanceStyles: observable,
      loadDanceStyles: action,
      setTokens: action,
      setAppLoaded: action,
    });

    reaction(
      () => this.refreshToken,
      (token) => {
        if (token) {
          window.localStorage.setItem('refreshToken', token);
        } else {
          window.localStorage.removeItem('refreshToken');
        }
      }
    );

    reaction(
      () => this.accessToken,
      (token) => {
        if (token) {
          window.localStorage.setItem('accessToken', token);
        } else {
          window.localStorage.removeItem('accessToken');
        }
      }
    );
  }

  async loadDanceStyles() {
    this.isLoadingDanceStyles = true;
    try {
      const danceStyles = await getAllDanceStylesAPI();
      runInAction(() => {
        this.danceStyles = danceStyles;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoadingDanceStyles = false;
      });
    }
  }

  async loadDanceTrainers() {
    this.isLoadingDanceStyles = true;
    try {
      const choreographers = await getAllChoreoghraphsAPI();
      runInAction(() => {
        this.choreographers = choreographers;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.isLoadingDanceStyles = false;
      });
    }
  }

  setTokens(accessToken: string | null, refreshToken: string | null) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();
