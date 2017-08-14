export type Storage = {
  clear(): void;
  get(key: string): string | null;
  key(index: number): string | null;
  readonly length: number;
  remove(key: string): void;
  set(key: string, data: string): void;
  [index: number]: string;
  [key: string]: any;
}

export abstract class StorageBase implements Storage {
  clear() { }
  get(key: string): string | null { return key ? null : ''; }
  key(index: number): string | null { return index ? null : ''; }
  length = 0;
  remove(key: string) { key += ''; }
  set(key: string, data: string) { data = key + data; }
  [index: number]: string;
}

//type Volatile = any;
//type ShortTermSupport = any;
//type LongTermSupport = any;
//type STS = ShortTermSupport;
//type LTS = LongTermSupport;
