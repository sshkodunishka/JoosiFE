import { MasterClass } from '@/services/masterClass';
import { action, computed, makeObservable, observable } from 'mobx';

const LIMIT = 10;

const mockedWorkflows: MasterClass[] = [
  {
    id: 1,
    title: 'Dance Class',
    eventDate: '2023-04-20',
    description: 'asdasdhlerkjwegr hweh rweghr kjweb rjkwer kjbwe kjrwe ',
    photoLink:
      'https://www.zelda.com/links-awakening/assets/img/home/hero-char.png',
    videoLink:
      'https://www.zelda.com/links-awakening/assets/img/home/hero-char.png',
    creator: {
      id: 1,
      name: 'Kristina',
      lastName: '321',
      photoLink:
        'https://www.zelda.com/links-awakening/assets/img/home/hero-char.png',
    },
    danceStyles: [
      {
        id: 1,
        name: 'style1',
      },
    ],
  },
  {
    id: 2,
    title: 'Dance Class 2',
    eventDate: '2023-04-21',
    description: 'djfjkdghfkjsdfndsjkfbslnfjs',
    photoLink:
      'https://www.zelda.com/links-awakening/assets/img/home/hero-char.png',
    videoLink:
      'https://www.zelda.com/links-awakening/assets/img/home/hero-char.png',
    creator: {
      id: 1,
      name: 'Kristina',
      lastName: '321',
      photoLink:
        'https://www.zelda.com/links-awakening/assets/img/home/hero-char.png',
    },
    danceStyles: [
      {
        id: 1,
        name: 'style1',
      },
    ],
  },
];

export class MasterClassStore {
  masterClasssRegistry = observable.map();
  isLoading = false;
  page = 0;
  totalPagesCount = 0;

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      page: observable,
      totalPagesCount: observable,
      masterClasssRegistry: observable,
      masterClasss: computed,
      setPage: action,
      loadMasterClasss: action,
      loadMasterClass: action,
      deleteMasterClass: action,
    });
  }

  setPage(page: number) {
    this.page = page;
  }

  get masterClasss(): MasterClass[] {
    const ret = [];
    for (let value of this.masterClasssRegistry.values()) {
      ret.push(value);
    }
    console.log(ret);
    return ret;
  }

  loadMasterClasss() {
    this.isLoading = true;
    this.masterClasssRegistry.clear();
    for (let masterClass of mockedWorkflows) {
      this.masterClasssRegistry.set(masterClass.id, masterClass);
      this.totalPagesCount = Math.ceil(mockedWorkflows.length / LIMIT);
    }
    console.log('masterClasssRegistry');
    console.log(this.masterClasssRegistry);
    action(() => {
      this.isLoading = false;
    });
  }

  getMasterClass(id: number | null): MasterClass | null {
    if (!id) {
      return null;
    }
    return this.masterClasssRegistry.get(id);
  }

  loadMasterClass(id: number, { acceptCached = false } = {}) {
    if (acceptCached) {
      const masterClass = this.getMasterClass(id);
      if (masterClass) return Promise.resolve(masterClass);
    }
    this.isLoading = true;
    action(() => {
      this.isLoading = false;
    });
  }
  async deleteMasterClass(id: number) {}
}

export default new MasterClassStore();
