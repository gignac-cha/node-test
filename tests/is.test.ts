import assert from 'node:assert';
import test, { describe } from 'node:test';
import { expect } from './expect';
import { is } from '../sources/is';

describe('is', () => {
  test('boolean()', () => {
    expect(is.boolean(false)).toBeTruthy();
    expect(is.boolean(true)).toBeTruthy();
    expect(is.boolean(0)).toBeFalsy();
    expect(is.boolean(1)).toBeFalsy();
    expect(is.boolean('')).toBeFalsy();
    expect(is.boolean('test')).toBeFalsy();
    expect(is.boolean([])).toBeFalsy();
    expect(is.boolean([1, 2, 3])).toBeFalsy();
    expect(is.boolean({})).toBeFalsy();
    expect(is.boolean({ key: 'value' })).toBeFalsy();
    expect(is.boolean(() => {})).toBeFalsy();
    expect(is.boolean(undefined)).toBeFalsy();
    expect(is.boolean(null)).toBeFalsy();
    expect(is.boolean(NaN)).toBeFalsy();
    expect(is.boolean(Infinity)).toBeFalsy();
  });
});
