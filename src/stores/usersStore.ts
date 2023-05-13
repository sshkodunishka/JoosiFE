import { User } from '@/services/masterClass';
import { changeUserRoleAPI, getAllUsersAPI } from '@/services/user-service';
import { action, makeObservable, observable, runInAction } from 'mobx';

export class UsersStore {
  users: User[] = [];
  inProgress = false;
  errors = undefined;

  constructor() {
    makeObservable(this, {
      inProgress: observable,
      errors: observable,
      users: observable,
      changeUserRole: action,
    });
  }

  async loadInitialData() {
    this.inProgress = true;
    try {
      const users = await getAllUsersAPI();
      runInAction(() => {
        this.users = users;
      });
    } catch (e) {
      console.error(e);
    } finally {
      runInAction(() => {
        this.inProgress = false;
      });
    }
  }

  async changeUserRole(userId: number) {
    this.inProgress = true;
    try {
      await changeUserRoleAPI(userId);
      await this.loadInitialData();
    } catch (e) {
    } finally {
      runInAction(() => {
        this.inProgress = false;
      });
    }
  }
}

export default new UsersStore();
