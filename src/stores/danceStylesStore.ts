import {
  DanceStyle,
  addDanceStyleAPI,
  getAllDanceStylesAPI,
} from '@/services/dance-style';
import { action, makeObservable, observable } from 'mobx';

export class DanceStyleStore {
  inProgress = false;
  errors = undefined;

  danceStyles: DanceStyle[] = [];

    constructor() {
      makeObservable(this, {
        inProgress: observable,
        errors: observable,
        danceStyles: observable,
        addDanceStyle: action,
        removeDanceStyle: action,
        loadInitialData: action,
      });
    }

  loadInitialData() {
    this.inProgress = true;
    return getAllDanceStylesAPI()
      .then(
        action((danceStyles: DanceStyle[]) => {
          this.danceStyles = danceStyles;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  async addDanceStyle(styleName: string) {
    if (this.danceStyles.map((ds) => ds.style).includes(styleName)) {
      return;
    }
    const danceStyle = await addDanceStyleAPI(styleName);
    this.danceStyles.push(danceStyle);
  }

  removeDanceStyle(danceStyle: string) {
    this.danceStyles = this.danceStyles.filter((t) => t.style !== danceStyle);
  }
}

export default new DanceStyleStore();
