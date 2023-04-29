import { observable, action, reaction, makeObservable } from 'mobx';

export class CommonStore {
  appName = 'Joose';
  token = window.localStorage.getItem('jwt');
  appLoaded = false;
  danceStyles: string[] = [];
  isLoadingDanceStyles = false;

  constructor() {
    makeObservable(this, {
      appName: observable,
      token: observable,
      appLoaded: observable,
      danceStyles: observable,
      isLoadingDanceStyles: observable,
      loadDanceStyles: action,
      setToken: action,
      setAppLoaded: action,
    });

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  loadDanceStyles() {
    this.isLoadingDanceStyles = false;
    this.danceStyles = [
      'style1',
      'style2',
      'style3',
      'style4',
      'style5',
      'style6',
      'style7',
      'style8',
      'style9',
    ];
    // return agent.Tags.getAll()
    //   .then(action(({ tags }: { tags: string[] }) => { this.tags = tags.map((t: string) => t.toLowerCase()); }))
    //   .finally(action(() => { this.isLoadingTags = false; }))
  }

  setToken(token: string | null) {
    this.token = token;
  }

  setAppLoaded() {
    this.appLoaded = true;
  }
}

export default new CommonStore();
