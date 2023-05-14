import { User, uploadFileAPI } from '@/services/masterClass';
import {
  getCurrentUserAPI,
  updateUserProfileAPI,
  updateUserProfileImageAPI,
} from '@/services/user-service';
import { action, makeObservable, observable, runInAction } from 'mobx';

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
      updateUser: action,
      uploadFile: action,
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

  async updateUser(newUser: Partial<User>) {
    this.updatingUser = true;
    try {
      const user = await updateUserProfileAPI(newUser);
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

  async uploadFile(file: any) {
    this.updatingUser = true;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const fileUrl = await uploadFileAPI(formData);
      await updateUserProfileImageAPI({
        photoLink: fileUrl,
      });
      runInAction(() => {
        this.currentUser = {
          ...(this.currentUser as User),
          photoLink: fileUrl,
        };
      });
      return fileUrl;
    } catch (e) {
      console.error(e);
    } finally {
      this.updatingUser = false;
    }
  }

  signOut() {
    this.currentUser = undefined;
  }
}

export default new UserStore();
