import userStore, { UserStore } from './userStore';
import commonStore, { CommonStore } from './commonStore';
import authStore, { AuthStore } from './authStore';
import masterClassStore, { MasterClassStore } from './masterClassStore';
import editorStore, { EditorStore } from './editorStore';
import danceStyleStore, { DanceStyleStore } from './danceStylesStore';
import usersStore, { UsersStore } from './usersStore';
import choreographersStore, {
  ChoreographersStore,
} from './choreographersStore';
import chatStore, { ChatStore } from './chatStore';

export type RootStore = {
  userStore: UserStore;
  commonStore: CommonStore;
  authStore: AuthStore;
  masterClassStore: MasterClassStore;
  editorStore: EditorStore;
  danceStyleStore: DanceStyleStore;
  usersStore: UsersStore;
  choreographersStore: ChoreographersStore;
  chatStore: ChatStore;
};

const rootStore: RootStore = {
  userStore,
  commonStore,
  authStore,
  masterClassStore,
  editorStore,
  danceStyleStore,
  usersStore,
  choreographersStore,
  chatStore,
};

export default rootStore;
