import { DanceStyle, getAllDanceStylesAPI } from '@/services/dance-style';
import { observable, action, reaction, makeObservable } from 'mobx';

export class CommonStore {
  appName = 'Joose';
  accessToken = window.localStorage.getItem('accessToken');
  refreshToken = window.localStorage.getItem('refreshToken');
  appLoaded = false;
  danceStyles: DanceStyle[] = [];
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

  loadDanceStyles() {
    this.isLoadingDanceStyles = false;

    return getAllDanceStylesAPI()
      .then(
        action((danceStyles: DanceStyle[]) => {
          this.danceStyles = danceStyles;
        })
      )
      .finally(
        action(() => {
          this.isLoadingDanceStyles = false;
        })
      );
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
