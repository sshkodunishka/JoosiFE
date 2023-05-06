import { action, makeObservable, observable } from 'mobx';
import masterClassStore from './masterClassStore';
import {
  CreateMasterClass,
  MasterClass,
  UpdateMasterClass,
} from '@/services/masterClass';
import { DanceStyle } from '@/services/dance-style';

export class EditorStore {
  inProgress = false;
  errors = undefined;
  masterClassId: number | null = null;

  title = '';
  description = '';
  price = 0;
  eventDate = '';
  eventDateISO = '';
  photoLink = '';
  videoLink = '';

  danceStyles: DanceStyle[] = [];

  constructor() {
    makeObservable(this, {
      inProgress: observable,
      errors: observable,
      masterClassId: observable,
      title: observable,
      description: observable,
      price: observable,
      eventDate: observable,
      eventDateISO: observable,
      photoLink: observable,
      videoLink: observable,
      danceStyles: observable,
      setMasterClassId: action,
      loadInitialData: action,
      reset: action,
      setTitle: action,
      setDescription: action,
      setPrice: action,
      setEventData: action,
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

  loadInitialData() {
    if (!this.masterClassId) return Promise.resolve();
    this.inProgress = true;
    return masterClassStore!
      .loadMasterClass(this.masterClassId, { acceptCached: true })!
      .then(
        action((masterClass: MasterClass) => {
          if (!masterClass) throw new Error("Can't load original masterClass");
          this.title = masterClass.title;
          this.description = masterClass.description;
          this.danceStyles = masterClass.danceStyles;
        })
      )
      .finally(
        action(() => {
          this.inProgress = false;
        })
      );
  }

  reset() {
    this.title = '';
    this.price = 0;
    this.eventDate = '';
    this.photoLink = '';
    this.videoLink = '';
    this.description = '';
    this.danceStyles = [];
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setPrice(price: number) {
    this.price = price;
  }

  setEventData(eventDate: string) {
    this.eventDate = eventDate;
    this.eventDateISO = new Date(eventDate).toISOString();
  }

  setPhotoLink(photoLink: string) {
    this.photoLink = photoLink;
  }

  setVideoLink(videoLink: string) {
    this.videoLink = videoLink;
  }

  addDanceStyle(danceStyle: string) {
    if (this.danceStyles.map((ds) => ds.style).includes(danceStyle)) return;
    this.danceStyles.push({ id: Math.random() * 1000, style: danceStyle });
  }

  removeDanceStyle(danceStyle: string) {
    this.danceStyles = this.danceStyles.filter((t) => t.style !== danceStyle);
  }

  submit() {
    this.inProgress = true;
    this.errors = undefined;
    const masterClass: CreateMasterClass | UpdateMasterClass = {
      title: this.title,
      price: this.price,
      eventDate: this.eventDate,
      photoLink: this.eventDate,
      videoLink: this.eventDate,
      description: this.description,
      danceStyles: this.danceStyles,
      id: this.masterClassId,
    };

    return (
      this.masterClassId
        ? masterClassStore.updateMasterClass(masterClass as UpdateMasterClass)
        : masterClassStore.createMasterClass(masterClass)
    )
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
}

export default new EditorStore();
