import { WebStorage } from './platform';

export class LocalStorage extends WebStorage {
  windowStorage = window.localStorage;
}
