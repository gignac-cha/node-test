import { is } from './is';

const has = new (class {
  has<T extends 'boolean' | 'number' | 'string'>(
    target: unknown[],
    type: T,
  ): target is T extends 'boolean' ? boolean[] : T extends 'number' ? number[] : T extends 'string' ? string[] : never;
  has<T1 extends object & { [key: string]: unknown } & Record<string, unknown>, T2 extends string>(
    target: T1,
    key: T2,
  ): target is T1 & { [key in T2]: unknown };
  has<T1, T2>(target: T1, value: T2) {
    if (is.array(target) && target.every(is[value])) {
      return true;
    }
    if (is.object(target) && value in target) {
      return true;
    }
    return false;
  }
})().has;
