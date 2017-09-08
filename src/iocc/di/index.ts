/**
 * A type that a object is instances of.
 */
export const Type = Function;

export function isType(it: any): it is Type<any> {
  return typeof it === 'function';
}

export interface Type<T> extends Function { new (...args: any[]): T; }

/**
 * Creates a token that can be used in a DI.
 *
 * Use an `LocatorToken` whenever the injecting type is not reified
 * (does not have a runtime representation: interface, callable type,
 * array or parametrized type).
 *
 * `LocatorToken` is parameterized on type `T` of object
 * which will be returned by the `Locator` (to provide additional level
 * of type safety).
 */
export class LocatorToken<T> {
  nullObject: T | null;

  constructor(protected _desc: string) {
    this.nullObject = null;
  }

  toString(): string { return `LocatorToken ${this._desc}`; }

  /** @internal */
  get metadata() {
    return {
        name: 'LocatorToken',
    };
  }
}

/**
 * An interface that a function passed into {@link hoistDecl} has to implement.
 */
export interface HoistDeclFn { (): any; }

/**
 * Allows to refer to references which are not yet defined.
 *
 * For instance, when we need a declared to refer of di purposes,
 * but not yet defined, or when we are creating a not-yet-defined query.
 */
export function hoistDecl(hoistDeclFn: HoistDeclFn): Type<any> {
  (<any>hoistDeclFn).__hoist_decl__ = hoistDecl;
  (<any>hoistDeclFn).toString = function() { return represent(this()); };
  return (<Type<any>><any>hoistDeclFn);
}

/**
 * Lazily retrieves the instance from a hoistDecl.
 * Identity function when non-hoist-decl input.
 * See: {@link hoistDecl}
 */
export function resolveHoistDecl(type: any): any {
  return (typeof type === 'function'
          && type.hasOwnProperty('__hoist_decl__')
          && type.__hoist_decl__ === hoistDecl)
    ? (<HoistDeclFn>type)()
    : type;
}

export type _Representable = string | null | {
  name?: string;
  overriddenName?: string;
};

export interface _RepresentableArray extends Array<_Representable> {
  name?: string;
  overriddenName?: string;
}

export type Representable = _Representable | _RepresentableArray

/**
 * Return the canonical string representation of the object.
 * For many object types, including most builtins, eval(repr(obj)) == obj.
 * on builtins
 */
export function represent(token: Representable): string {
  if (isString(token)) return token;
  if (isArray(token)) return `[${token.map(represent).join(', ')}]`;
  if (null == token) return '' + token;
  if (token.overriddenName) return `${token.overriddenName}`;
  if (token.name) return `${token.name}`;
  const res = token.toString();
  if (null == res) return '' + res;
  const newLineIndex = res.indexOf('\n');
  return newLineIndex === -1 ? res : res.substring(0, newLineIndex);
}

function isString(token: Representable): token is string {
  return 'string' === typeof token;
}

function isArray(token: Representable): token is Array<Representable> {
  return token instanceof Array;
}
