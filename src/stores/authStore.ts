import { observable, action, makeObservable } from 'mobx';
import userStore from './userStore';
import commonStore from './commonStore';
import { loginAPI, registerAPI } from '@/services/auth-service';

export interface Tokens {
  acsess_token: string;
  refresh_token: string;
}

export class AuthStore {
  inProgress = false;
  errors = undefined;

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
    this.values.name = '';
    this.values.lastName = '';
    this.values.login = '';
    this.values.password = '';
  }

  login() {
    this.inProgress = true;
    this.errors = undefined;
    return loginAPI(this.values.login, this.values.password)
      .then((tokens: Tokens) =>
        commonStore.setTokens(tokens.acsess_token, tokens.refresh_token)
      )
      .then(() => userStore.pullUser())
      .catch(
        action((err: any) => {
          this.errors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  register() {
    this.inProgress = true;
    this.errors = undefined;
    return registerAPI(
      this.values.name,
      this.values.lastName,
      this.values.login,
      this.values.password
    )
      .then((tokens: Tokens) =>
        commonStore.setTokens(tokens.acsess_token, tokens.refresh_token)
      )
      .then(() => userStore.pullUser())
      .catch(
        action((err: any) => {
          this.errors =
            err.response && err.response.body && err.response.body.errors;
          throw err;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  logout() {
    commonStore.setTokens(null, null);
    userStore.forgetUser();
    return Promise.resolve();
  }
}

export default new AuthStore();
