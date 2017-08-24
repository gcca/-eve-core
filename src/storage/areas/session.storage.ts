import { WebStorage } from './areas';

export class SessionStorage extends WebStorage {
  windowStorage = window.sessionStorage;
}
