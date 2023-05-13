import { User } from '@/services/masterClass';
import { getCurrentUserAPI } from '@/services/user-service';
import { action, makeObservable, observable, runInAction } from 'mobx';
const agent: any = {};

export class UserStore {
  currentUser?: User;
  loadingUser?: boolean;
  updatingUser?: boolean;
  updatingUserErrors: any;

  constructor() {
    makeObservable(this, {
      currentUser: observable,
      loadingUser: observable,
      updatingUser: observable,
      updatingUserErrors: observable,
      pullUser: action,
      signOut: action,
    });
  }

  async pullUser() {
    this.loadingUser = true;
    const user = await getCurrentUserAPI();
    runInAction(() => {
      this.currentUser = user;
      this.loadingUser = false;
    });
  }

  async updateUser(newUser: User) {
    this.updatingUser = true;
    try {
      const user = await agent.User.update(newUser);
      runInAction(() => {
        this.currentUser = user;
      });
    } catch (error: any) {
      runInAction(() => {
        this.updatingUserErrors = error.data.errors;
      });
    } finally {
      runInAction(() => {
        this.updatingUser = false;
      });
    }
  }

  signOut() {
    this.currentUser = undefined;
  }
}

export default new UserStore();
