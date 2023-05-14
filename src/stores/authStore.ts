import { observable, action, makeObservable, runInAction } from 'mobx';
import userStore from './userStore';
import commonStore from './commonStore';
import { loginAPI, registerAPI } from '@/services/auth-service';

export interface Tokens {
  acsess_token: string;
  refresh_token: string;
}

export class AuthStore {
  inProgress = false;
  errors: any = undefined;

  values = {
    name: '',
    lastName: '',
    login: '',
    password: '',
  };

  constructor() {
    makeObservable(this, {
      inProgress: observable,
      errors: observable,
      values: observable,
      setName: action,
      setLastName: action,
      setLogin: action,
      setPassword: action,
      reset: action,
      login: action,
      register: action,
      logout: action,
    });
  }

  setName(name: string) {
    this.values.name = name;
  }

  setLastName(lastName: string) {
    this.values.lastName = lastName;
  }

  setLogin(login: string) {
    this.values.login = login;
  }

  setPassword(password: string) {
    this.values.password = password;
  }

  reset() {
    this.errors = undefined;
    this.values.name = '';
    this.values.lastName = '';
    this.values.login = '';
    this.values.password = '';
  }
  async login() {
    this.inProgress = true;
    this.errors = undefined;
    try {
      const tokens = await loginAPI(this.values.login, this.values.password);
      runInAction(() => {
        commonStore.setTokens(tokens.acsess_token, tokens.refresh_token);
      });
      await userStore.pullUser();
    } catch (err: any) {
      runInAction(() => {
        this.errors = [err.response.data.message];
        throw err;
      });
    } finally {
      runInAction(() => {
        this.inProgress = false;
      });
    }
  }

  async register() {
    this.inProgress = true;
    this.errors = undefined;

    try {
      const tokens = await registerAPI(
        this.values.name,
        this.values.lastName,
        this.values.login,
        this.values.password
      );

      runInAction(() => {
        commonStore.setTokens(tokens.acsess_token, tokens.refresh_token);
      });

      await userStore.pullUser();
    } catch (err: any) {
      runInAction(() => {
        this.errors = [err.response.data.message];
      });
      throw err;
    } finally {
      runInAction(() => {
        this.inProgress = false;
      });
    }
  }

  logout() {
    commonStore.setTokens(null, null);
    userStore.signOut();
    return Promise.resolve();
  }
}

export default new AuthStore();
