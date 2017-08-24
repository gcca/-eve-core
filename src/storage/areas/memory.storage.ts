import { Area } from './index';

export class MemoryStorage implements Area {

  memory: Map<string, string>;

  constructor() {
    this.memory = new Map<string, string>();
  }

  get(key: string) {
    return this.memory.get(key);
  }

  set(key: string, value: string) {
    this.memory.set(key, value);
    return this;
  }
}
