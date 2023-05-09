import { action, makeObservable, observable, runInAction } from 'mobx';
import masterClassStore from './masterClassStore';
import {
  CreateDescription,
  CreateMasterClass,
  Descriptions,
  UpdateMasterClass,
  uploadFileAPI,
} from '@/services/masterClass';
import { DanceStyle } from '@/services/dance-style';

export class EditorStore {
  inProgress = false;
  uploadInProgress = false;
  errors = undefined;
  masterClassId: number | null = null;

  title = '';
  description = '';
  photoLink = '';
  videoLink = '';
  masterClassesDescriptions: (Descriptions | CreateDescription)[] = [];
  danceStyles: DanceStyle[] = [];
  creatorId: number = -1;

  constructor() {
    makeObservable(this, {
      inProgress: observable,
      uploadInProgress: observable,
      errors: observable,
      masterClassId: observable,
      title: observable,
      description: observable,
      masterClassesDescriptions: observable,
      photoLink: observable,
      videoLink: observable,
      danceStyles: observable,
      setMasterClassId: action,
      loadInitialData: action,
      reset: action,
      setTitle: action,
      setDescription: action,
      setPhotoLink: action,
      setVideoLink: action,
      addDanceStyle: action,
      removeDanceStyle: action,
      submit: action,
    });
  }

  setMasterClassId(masterClassId: number) {
    if (this.masterClassId !== masterClassId) {
      this.reset();
      this.masterClassId = masterClassId;
    }
  }

  async loadInitialData() {
    try {
      if (!this.masterClassId) return Promise.resolve();
      runInAction(() => {
        this.inProgress = true;
      });
      const masterClass = await masterClassStore.loadDescription(
        this.masterClassId,
        { acceptCached: true }
      );
      if (!masterClass) throw new Error("Can't load original masterClass");
      // this.description = masterClass.description;
      // this.danceStyles = masterClass.danceStyles;
    } catch (e) {
      console.error(e);
    } finally {
      runInAction(() => {
        this.inProgress = false;
      });
    }
  }

  reset() {
    this.title = '';
    this.photoLink = '';
    this.videoLink = '';
    this.description = '';
    this.danceStyles = [];
    this.masterClassesDescriptions = [];
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  async uploadFile(file: any, isImage: boolean) {
    this.uploadInProgress = true;
    try {
      const formData = new FormData();
      formData.append('file', file);
      const fileUrl = await uploadFileAPI(formData);
      if (isImage) {
        runInAction(() => {
          this.photoLink = fileUrl;
        });
      } else {
        runInAction(() => {
          this.videoLink = fileUrl;
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      this.uploadInProgress = false;
    }
  }

  setPhotoLink(photoLink: string) {
    this.photoLink = photoLink;
  }

  setVideoLink(videoLink: string) {
    this.videoLink = videoLink;
  }

  saveDescription(description: Descriptions | CreateDescription) {
    let existedDescription;
    if ((description as CreateDescription).tempId) {
      existedDescription = this.masterClassesDescriptions.find(
        (desc) =>
          (description as CreateDescription).tempId ===
          (desc as CreateDescription).tempId
      );
    }
    if ((description as Descriptions).id) {
      existedDescription = this.masterClassesDescriptions.find(
        (desc) => (description as Descriptions).id === (desc as Descriptions).id
      );
    }
    if (existedDescription) {
      this.updateDescription(description);
      return;
    }
    runInAction(() => {
      this.masterClassesDescriptions.push(description);
    });
    return;
  }

  deleteDescription(description: Descriptions | CreateDescription) {
    if ((description as Descriptions).id) {
      this.masterClassesDescriptions = this.masterClassesDescriptions.filter(
        (desc) => (desc as Descriptions).id !== (description as Descriptions).id
      );
    } else {
      this.masterClassesDescriptions = this.masterClassesDescriptions.filter(
        (desc) =>
          (desc as CreateDescription).tempId !==
          (description as CreateDescription).tempId
      );
    }
  }

  updateDescription(description: Descriptions | CreateDescription) {
    if ((description as Descriptions).id) {
      this.masterClassesDescriptions = this.masterClassesDescriptions.map(
        (desc) =>
          (desc as Descriptions).id === (description as Descriptions).id
            ? description
            : desc
      );
    } else {
      this.masterClassesDescriptions = this.masterClassesDescriptions.map(
        (desc) =>
          (desc as CreateDescription).tempId ===
          (description as CreateDescription).tempId
            ? description
            : desc
      );
    }
  }

  setDanceStyles(danceStyles: any) {
    this.danceStyles = danceStyles;
  }

  addDanceStyle(danceStyle: string) {
    if (this.danceStyles.map((ds) => ds.style).includes(danceStyle)) return;
    this.danceStyles.push({ id: Math.random() * 1000, style: danceStyle });
  }

  removeDanceStyle(danceStyle: string) {
    this.danceStyles = this.danceStyles.filter((t) => t.style !== danceStyle);
  }

  async submit() {
    try {
      this.inProgress = true;
      this.errors = undefined;
      const masterClassDTO: CreateMasterClass | UpdateMasterClass = {
        title: this.title,
        imageLink: this.photoLink,
        videoLink: this.videoLink,
        description: this.description,
        danceStylesIds: this.danceStyles.map((ds) => ds.id),
        id: this.masterClassId,
      };
      const masterClass = await masterClassStore.createMasterClass(
        masterClassDTO
      );

      for (let description of this.masterClassesDescriptions) {
        await masterClassStore.createMasterClassDescription(
          masterClass.id,
          description as CreateDescription
        );
      }
    } catch (e: any) {
      runInAction(() => {
        this.errors = e.response && e.response.body && e.response.body.errors;
        console.log(e);
      });
    } finally {
      runInAction(() => {
        this.reset();
        this.inProgress = false;
      });
    }
  }
}

export default new EditorStore();
