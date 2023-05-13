import { User } from '@/services/masterClass';
import {
  Choreographers,
  getAllChoreoghraphsAPI,
  getOneChoreoghrapherAPI,
} from '@/services/user-service';
import { action, makeObservable, observable, runInAction } from 'mobx';

export class ChoreographersStore {
  isLoading = false;
  choreographers: Choreographers[] = [];
  choreographer: Choreographers | null = null;
  error: string | null = null;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      choreographers: observable,
      choreographer: observable,
      error: observable,
      loadAllChoreoghraphs: action,
    });
  }

  async loadAllChoreoghraphs() {
    this.isLoading = true;
    try {
      const choreographers = await getAllChoreoghraphsAPI();
      runInAction(() => {
        this.choreographers = choreographers;
      });
    } catch (e) {
      console.error(e);
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async loadChoreographer(id: number) {
    this.isLoading = true;
    try {
      const choreographer = await getOneChoreoghrapherAPI(id);
      runInAction(() => {
        this.choreographer = choreographer;
      });
    } catch (e: any) {
      console.error(e);
      runInAction(() => {
        this.error = e;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

export default new ChoreographersStore();
