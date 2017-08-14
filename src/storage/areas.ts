export interface Map<K, V> {
  //clear(): void;
  //delete(key: K): boolean;
  //forEach(callback: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any)
  //   : void;
  get(key: K): V | undefined;
  //has(key: K): boolean;
  set(key: K, value: V): this;
  //readonly size: number;
}

export interface Area { }

export abstract class WebStorage implements Map<string, string> {

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

export class LocalStorage extends WebStorage implements Area {
  windowStorage = window.localStorage;
}

export class MemoryStorage implements Area {}

export class SessionStorage extends WebStorage implements Area {
  windowStorage = window.sessionStorage;
}
