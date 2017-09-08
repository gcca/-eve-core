import { Container, Injector } from './di';

describe('di', () => {
  class BurgererContainer extends Container { }
  let container = BurgererContainer;

  interface BurgerMenu {
    select(name: string): string;
  }

  abstract class InjectMenuFilename {
    injectFilename(filename: string): void {
      throw new Error(`Not implemented yet: ${filename}`);
    }
  }

  class CSVBurgerMenu extends InjectMenuFilename
                      implements BurgerMenu, Injector {
    filename: string;

    // TODO: with constructors
    // constructor(private filename: string) { }

    inject(target: any) {
      (target as InjectMenu).injectMenu(this);
    }

    injectFilename(filename: string) {
      this.filename = filename;
    }

    select(name: string) {
      return `${name} of burgers [${this.filename}]`;
    }
  }

  class MenuFilenameInjector implements Injector {
    inject(target: any) {
      (target as InjectMenuFilename).injectFilename('menu.csv');
    }
  }

  abstract class InjectMenu {
    injectMenu(menu: BurgerMenu): void {
      throw new Error(`Not implemented yet: ${menu}`);
    }
  }

  class BurgerDispatcher extends InjectMenu {
    menu: BurgerMenu;

    // TODO: with constructors
    // constructor(private menu: BurgerMenu) { }

    injectMenu(menu: BurgerMenu) {
      this.menu = menu;
    }

    burgers(name: string) {
      return this.menu.select(name);
    }
  }

  function configureContainer(BurgererContainer: any) {
    container = BurgererContainer;
    registerComponents();
    registerInjectors();
    container.start();
  }

  function registerComponents() {
    container.registerComponent('BurgerDispatcher', BurgerDispatcher);
    container.registerComponent('BurgerMenu', CSVBurgerMenu);
  }

  let registerInjectors: Function;

  describe('strict evaluation', () => {
    class StrictBurgererContainer extends Container { }
    beforeEach(() => {
      container = StrictBurgererContainer;
      registerInjectors = () => {
        container.registerInjector(InjectMenuFilename,
                                   new MenuFilenameInjector());
        container.registerInjector(InjectMenu, container.lookup('BurgerMenu'));
      }
    });
    describeInjection();
  });

  xdescribe('lazy evaluation', () => {
    class LazyBurgererContainer extends Container { }
    beforeEach(() => {
      container = LazyBurgererContainer;
      registerInjectors = () => {
        container.registerInjector(InjectMenu, container.lookup('BurgerMenu'));
        container.registerInjector(InjectMenuFilename,
                                   new MenuFilenameInjector());
      }
    });
    describeInjection();
  });

  function describeInjection() {
    describe('injection', () => {
      it('should inject', () => {
        configureContainer(container);
        const dispatcher =
          container.lookup('BurgerDispatcher') as BurgerDispatcher;
        const burgers = dispatcher.burgers('bigmac');
        expect(burgers).to.equal('bigmac of burgers [menu.csv]');
      });
    });
  }
});
