import { User } from '@/services/masterClass';
import { changeUserRoleAPI, getAllUsersAPI } from '@/services/user-service';
import { action, makeObservable, observable } from 'mobx';

export class UsersStore {
  users: Omit<User, 'Roles'>[] = [];
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

  loadInitialData() {
    this.inProgress = true;
    return getAllUsersAPI()
      .then(
        action((users: User[]) => {
          this.users = users;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  async changeUserRole(userId: number) {
    this.inProgress = true;
    try {
      await changeUserRoleAPI(userId);
      action(() => {
        this.users = this.users.map((user) => {
          return user.id === userId ? { ...user, role: 'choreographer' } : user;
        });
      });
    } catch (e) {
    } finally {
      action(() => {
        this.inProgress = false;
      });
    }
  }
}

export default new UsersStore()