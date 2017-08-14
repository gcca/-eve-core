import { BrowserStorage } from './facades';
import { LongStorage, ShortStorage, VolatileStorage } from './keyed';

export type StorageType = 'volatile' | 'short' | 'long';

export function storageBuilder(type: StorageType): BrowserStorage {
  switch(type) {
    case 'long': return new LongStorage;
    case 'short': return new ShortStorage;
    case 'volatile': return new VolatileStorage;
    default: return invalidStorageType(type);
  }
}

function invalidStorageType(type: StorageType): never {
  throw new TypeError(`Unexpected storage type: ${type}`);
}
