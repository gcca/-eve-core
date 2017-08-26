declare global {
  const expect: Chai.ExpectStatic;
  const spy: sinon.SinonSpy;
  namespace NodeJS {
    export interface Global {
      window: any;
    }
  }
}

export { };
