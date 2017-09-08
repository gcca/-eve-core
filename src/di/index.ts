export interface Injector { inject(target: any): void; }

export abstract class Container {
  private static component: any;
  private static injector: any;

  private static check() {
    if (!this.component || !this.injector) {
      this.component = new Map<string, any>();
      this.injector = new Map<string, any>();
    }
  }

  static lookup(token: string) {
    this.check();
    const Component = this.component.get(token);
    const component = new Component();
    Object.getOwnPropertyNames(Component.prototype)
          .filter(p => p.startsWith('inject') && 'inject' !== p)
          .forEach(token => this.injector.get(token).inject(component));
    return component;
  }

  static registerComponent(token: string, component: any) {
    this.check();
    this.component.set(token, component);
  }

  static registerInjector(token: any, injector: any) {
    this.check();
    const injectors = Object
      .getOwnPropertyNames(token.prototype)
      .filter(p => p.startsWith('inject') && 'inject' !== p);
    if (injectors.length) {
      const token = injectors[0];
      this.injector.set(token, injector);
    } else {
      throw new TypeError('Bad injector');
    }
  }

  static start() { }
}
