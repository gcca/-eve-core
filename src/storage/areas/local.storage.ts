import { WebStorage } from './areas';

export class LocalStorage extends WebStorage {
  windowStorage = window.localStorage;
}
