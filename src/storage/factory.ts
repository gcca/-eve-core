import { storageBuilder, StorageType } from './builder';
import { Storage } from './index';

export interface Injectable {
  storage(): Storage;
}

export function storageFactory(injectable: Injectable): Storage {
  let storage = storageBy.get(injectable);
  return storage ? storage : notRegisteredInjectable(injectable);
}

export function storageRegister(injectable: Injectable,
                                type: StorageType): void {
  const storage = storageBuilder(type);
  storageBy.set(injectable, storage);
}

const storageBy = new WeakMap<Injectable, Storage>();

function notRegisteredInjectable(injectable: Injectable): never {
  throw new TypeError(`Unexpected injectable: ${injectable}`);
}
