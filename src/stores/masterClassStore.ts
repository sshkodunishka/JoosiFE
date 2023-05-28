import {
  CreateDescription,
  CreateMasterClass,
  Descriptions,
  MasterClass,
  UpdateMasterClass,
  createMasterClassAPI,
  createMasterClassDescriptionAPI,
  getDescriptionByIdAPI,
  getUpcomingDescriptionsAPI,
  cancelClassAPI,
  signUpForClassAPI,
  getUserDescriptionsAPI,
  deleteClassAPI,
  updateMasterClassAPI,
  User,
  getRequestsByDescIdAPI,
} from '@/services/masterClass';
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from 'mobx';
import { RootStore } from '.';

const LIMIT = 10;

export class MasterClassStore {
  masterClasssDescRegistry = observable.map();
  isLoading = false;
  page = 0;
  totalPagesCount = 0;
  description: Descriptions | null = null;
  listOfUsers: User[] = []
  constructor() {
    makeObservable(this, {
      isLoading: observable,
      page: observable,
      totalPagesCount: observable,
      masterClasssDescRegistry: observable,
      description: observable,
      listOfUsers: observable,
      descriptions: computed,
      setPage: action,
      loadMasterClasss: action,
      loadDescription: action,
      deleteMasterClass: action,
    });
  }

  setPage(page: number) {
    this.page = page;
  }

  get descriptions(): Descriptions[] {
    const masterClasses = [];
    for (let value of this.masterClasssDescRegistry.values()) {
      masterClasses.push(value);
    }
    return masterClasses;
  }

  async loadMasterClasss(filters: {
    danceStyleId?: string;
    trainerId?: string;
    isUserRequest?: boolean;
    isChoreographerRequest?: boolean;
  }) {
    this.isLoading = true;
    let descriptions: Descriptions[] = [];

    this.masterClasssDescRegistry.clear();
    if (filters.isUserRequest) {
      descriptions = await getUserDescriptionsAPI('user');
    } else if (filters.isChoreographerRequest) {
      descriptions = await getUserDescriptionsAPI('choreographer');
    } else {
      descriptions = await getUpcomingDescriptionsAPI(filters);
    }
    runInAction(() => {
      for (let description of descriptions) {
        this.masterClasssDescRegistry.set(description.id, description);
        this.totalPagesCount = Math.ceil(descriptions.length / LIMIT);
      }
      this.isLoading = false;
    });
  }



  getMasterClass(id: number | null): Descriptions | null {
    if (!id) {
      return null;
    }
    return this.masterClasssDescRegistry.get(id);
  }

  async loadDescription(id: number, userId: number | undefined) {
    this.isLoading = true;
    const description = await getDescriptionByIdAPI(id);
    let listOfUsers : User[] = []
    if(description.MasterClasses.creatorId===userId) {
      listOfUsers = await getRequestsByDescIdAPI(id)
    }
    runInAction(() => {
      this.description = description;
      this.listOfUsers = listOfUsers
      this.isLoading = false;
    });
    return description;
  }

  async signUp(descriptionId: number) {
    await signUpForClassAPI(descriptionId);
    const description = await getDescriptionByIdAPI(this.description!.id);
    runInAction(() => {
      this.description = description;
      this.isLoading = false;
    });
  }

  async cancelClass(descriptionId: number) {
    await cancelClassAPI(descriptionId);
    const description = await getDescriptionByIdAPI(this.description!.id);
    runInAction(() => {
      this.description = description;
      this.isLoading = false;
    });
  }

  async deleteMasterClass(id: number) {
    try {
      await deleteClassAPI(id);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async updateMasterClass(masterClass: UpdateMasterClass) {
    try {
      const masterClassResp = await updateMasterClassAPI(masterClass);
      return masterClassResp;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  async createMasterClass(
    masterClass: CreateMasterClass
  ): Promise<MasterClass> {
    try {
      const masterClassResp = await createMasterClassAPI(masterClass);
      return masterClassResp;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
  async createMasterClassDescription(
    masterClassId: number,
    description: CreateDescription
  ) {
    try {
      const descriptionResp = await createMasterClassDescriptionAPI(
        masterClassId,
        description
      );
      return descriptionResp;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

export default new MasterClassStore();
