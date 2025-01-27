import assert from 'node:assert';

const expectAssert = (actual: boolean) => assert.strictEqual(actual, true);

const toBe = <T>(actual: T, expected: T) => actual === expected;
const toBeFalsy = <T>(actual: T) =>
  typeof actual === 'undefined' || actual === null || actual === false || actual === 0 || actual === '';
const toBeTruthy = <T>(actual: T) => !toBeFalsy(actual);

export const expect = <T>(actual: T) => ({
  toBe: (expected: T) => expectAssert(toBe(actual, expected)),
  toBeTruthy: () => expectAssert(toBeTruthy(actual)),
  toBeFalsy: () => expectAssert(toBeFalsy(actual)),
});
