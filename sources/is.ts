const boolean = (value: unknown): value is boolean => typeof value === 'boolean';
const number = (value: unknown): value is number => typeof value === 'number';
const string = (value: unknown): value is string => typeof value === 'string';
const object = (value: unknown): value is object => typeof value === 'object' && not.null(value) && not.array(value);
const array = (value: unknown): value is unknown[] => object(value) && Array.isArray(value);
const function_ = (value: unknown): value is Function => typeof value === 'function';

const null_ = (value: unknown): value is null => value === 'null';
const undefined_ = (value: unknown): value is undefined => typeof value === 'undefined';

const not = {
  boolean: <T>(value: T): value is Exclude<T, boolean> => !boolean(value),
  number: <T>(value: T): value is Exclude<T, number> => !number(value),
  string: <T>(value: T): value is Exclude<T, string> => !string(value),
  array: <T>(value: T): value is Exclude<T, unknown[]> => !array(value),
  object: <T>(value: T): value is Exclude<T, object> => !object(value),
  function: <T>(value: T): value is Exclude<T, Function> => !function_(value),

  null: <T>(value: T): value is Exclude<T, null> => !null_(value),
  undefined: <T>(value: T): value is Exclude<T, undefined> => !undefined_(value),
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
  not,
};
