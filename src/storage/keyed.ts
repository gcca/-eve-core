import { Area } from './areas';
import { LocalStorage } from './areas/localstorage';
import { MemoryStorage } from './areas/memorystorage';
import { SessionStorage } from './areas/sessionstorage';
import { BrowserStorage } from './facades';
import { Storage } from './index';

type Mixin = (Base: new() => Storage) => new() => Storage & { area(): Area };

const longMixin: Mixin = Base => class extends Base {
  area() { return new LocalStorage; }
};

const shortMixin: Mixin = Base => class extends Base {
  area() { return new SessionStorage; }
};

const volatileMixin: Mixin = Base => class extends Base {
  area() { return new MemoryStorage; }
};

export class LongStorage extends longMixin(BrowserStorage) { }

export class ShortStorage extends shortMixin(BrowserStorage) { }

export class VolatileStorage extends volatileMixin(BrowserStorage) { }
