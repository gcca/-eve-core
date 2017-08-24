import { Area } from './index';

export abstract class WebStorage implements Area {

  windowStorage: Storage;

  get(key: string) {
    const item = this.windowStorage.getItem(key);
    return item ? item : undefined;
  }

  set(key: string, value: string) {
    this.windowStorage.setItem(key, value);
    return this;
  }
}
