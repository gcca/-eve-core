import { LocalStorage } from './local.storage';

describe('Storage', () => {

  beforeEach(() => {
    global.window = {
      localStorage: {
        getItem: spy(),
        setItem: spy(),
      }
    };
  });

  describe('on Area', () => {
    describe('with WebAPIStorage', () => {
      it('should retrieve same value from window.localStorage', () => {
        const localStorage = new LocalStorage();
        localStorage.set('key', 'value');
        const setItemSpy = global.window.localStorage.setItem;
        expect(setItemSpy.calledWith('key', 'value')).to.be.ok;
      });
    });
  });
});
