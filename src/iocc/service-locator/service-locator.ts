export interface Service { }

export interface Locator { [name: string]: Service | Literal }

export type Literal = string | number | (string | number)[];

export type InheritedServiceLocator<T extends ServiceLocator> = T & any;

/**
 * Segregated locator interfarces base class.
 *
 * _Thoughts:_
 * - It shouldn't use a generic type. Maybe we'll use a decorator.
 *
 * @experimental
 */
export abstract class ServiceLocator extends
    class implements Locator { [name: string]: Service | Literal } {

  static load<T extends ServiceLocator>(locator: T): void {
    this.sole = locator;
  }

  static locator<T extends ServiceLocator>
      (this: { new(...services: (Literal | Service)[]): T
               sole: ServiceLocator & T }): T {
    return this.sole;
  }

  static sole: InheritedServiceLocator<ServiceLocator>;
}
