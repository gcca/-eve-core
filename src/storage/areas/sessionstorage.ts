import { WebStorage } from './platform';

export class SessionStorage extends WebStorage {
  windowStorage = window.sessionStorage;
}
