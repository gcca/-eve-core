/**
 * Segregated locator interfarces base class.
 *
 * _Thoughts:_
 * - It shouldn't use a generic type. Maybe we'll use a decorator.
 *
 * @experimental
 */
export abstract class ServiceLocator {

  static load<T>(locator: T): void {
    this.sole = locator;
  }

  static locator<T>(): T {
    return this.sole;
  }

  static sole: any;
}
