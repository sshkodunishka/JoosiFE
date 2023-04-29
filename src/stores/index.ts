import userStore, { UserStore } from './userStore';
import commonStore, { CommonStore } from './commonStore';
import authStore, { AuthStore } from './authStore';
import masterClassStore, { MasterClassStore } from './masterClassStore';

export type RootStore = {
  userStore: UserStore;
  commonStore: CommonStore;
  authStore: AuthStore;
  masterClassStore: MasterClassStore;
};

const rootStore: RootStore = {
  userStore,
  commonStore,
  authStore,
  masterClassStore,
};

export default rootStore;
