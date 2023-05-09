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
      updateUser: action,
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

  updateUser(newUser: User) {
    this.updatingUser = true;
    return agent.Auth.save(newUser)
      .then(
        action(({ user }: { user: User }) => {
          this.currentUser = user;
        })
      )
      .finally(
        action(() => {
          this.updatingUser = false;
        })
      );
  }

  signOut() {
    this.currentUser = undefined;
  }
}

export default new UserStore();
