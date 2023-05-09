import {
  DanceStyle,
  addDanceStyleAPI,
  deleteDanceStyleAPI,
  getAllDanceStylesAPI,
  updateDanceStyleAPI,
} from '@/services/dance-style';
import { action, makeObservable, observable, runInAction } from 'mobx';

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
      updateDanceStyle: action,
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
    runInAction(() => {
      this.danceStyles.push(danceStyle);
    });
  }

  async updateDanceStyle(id: number, newStyleName: string) {
    const danceStyle = this.danceStyles.find((ds) => ds.id === id);
    const existedDanceStyle = this.danceStyles.find(
      (ds) => ds.style === newStyleName
    );
    if (!danceStyle || existedDanceStyle) {
      return;
    }
    await updateDanceStyleAPI(id, newStyleName);
    runInAction(() => {
      this.danceStyles = this.danceStyles.map((ds) =>
        ds.id === id ? { ...ds, style: newStyleName } : ds
      );
    });
  }

  async removeDanceStyle(id: number) {
    await deleteDanceStyleAPI(id);
    runInAction(() => {
      this.danceStyles = this.danceStyles.filter((t) => t.id !== id);
    });
  }
}

export default new DanceStyleStore();
