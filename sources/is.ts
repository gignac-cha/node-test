declare type NaN = (number | Number) & { readonly NaN: unique symbol };
declare var NaN: NaN;
declare function isNaN(number: number | Number): number is NaN;

declare type Infinity = (number | Number) & { readonly Infinity: unique symbol };
declare var Infinity: Infinity;
declare function isFinite<T extends number | Number>(number: T): number is Exclude<T, Infinity>;

const boolean = (value: unknown): value is boolean =>
  typeof value === 'boolean' || (typeof value === 'object' && value instanceof Boolean);
const number = (value: unknown): value is number =>
  (typeof value === 'number' || (typeof value === 'object' && value instanceof Number)) &&
  !isNaN(value) &&
  isFinite(value);
const string = (value: unknown): value is string =>
  typeof value === 'string' || (typeof value === 'object' && value instanceof String);
const array = (value: unknown): value is unknown[] => typeof value === 'object' && Array.isArray(value);
const object = <T extends object>(value: unknown): value is T =>
  typeof value === 'object' &&
  value !== null &&
  !Array.isArray(value) &&
  !(value instanceof Boolean) &&
  !(value instanceof Number) &&
  !(value instanceof String);
const function_ = (value: unknown): value is Function => typeof value === 'function';

const undefined_ = (value: unknown): value is undefined => typeof value === 'undefined';
const null_ = (value: unknown): value is null => typeof value === 'object' && value === null;
const nullable = (value: unknown): value is undefined | null => undefined_(value) || null_(value);
const NaN_ = (value: unknown): value is NaN =>
  (typeof value === 'number' || (typeof value === 'object' && value instanceof Number)) && isNaN(value);
const Infinity_ = (value: unknown): value is Infinity =>
  (typeof value === 'number' || (typeof value === 'object' && value instanceof Number)) &&
  !isNaN(value) &&
  !isFinite(value);

const falsy = (value: unknown): value is undefined | null | false | 0 | '' =>
  nullable(value) || value === false || value === 0 || value === '';
const truthy = (value: unknown): value is Exclude<unknown, ReturnType<typeof falsy>> => !falsy(value);

const not = {
  boolean: <T>(value: T): value is Exclude<T, boolean | Boolean> => !boolean(value),
  number: <T>(value: T): value is Exclude<T, number | Number> => !number(value),
  string: <T>(value: T): value is Exclude<T, string | String> => !string(value),
  array: <T>(value: T): value is Exclude<T, unknown[]> => !array(value),
  object: <T>(value: T): value is Exclude<T, object> => !object(value),
  function: <T>(value: T): value is Exclude<T, Function> => !function_(value),

  undefined: <T>(value: T): value is Exclude<T, undefined> => !undefined_(value),
  null: <T>(value: T): value is Exclude<T, null> => !null_(value),
  nullable: <T>(value: T): value is Exclude<T, undefined | null> => !nullable(value),
  NaN: <T>(value: T): value is Exclude<T, NaN> => !NaN_(value),
  Infinity: <T>(value: T): value is Exclude<T, Infinity> => !Infinity_(value),

  truthy: <T>(value: T): value is Exclude<T, ReturnType<typeof falsy>> => !truthy(value),
  falsy: <T>(value: T): value is Exclude<T, undefined | null | false | 0 | ''> => !falsy(value),
};

export const is = {
  boolean,
  number,
  string,
  array,
  object,
  function: function_,

  null: null_,
  undefined: undefined_,
  nullable,
  NaN: NaN_,
  Infinity: Infinity_,

  truthy,
  falsy,

  not,
};
