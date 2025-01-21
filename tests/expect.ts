import assert from 'node:assert';

export const expect = <T>(actual: T) => ({
  toBe: (expected: T) => assert.strictEqual(actual === expected, true),
  toBeTruthy: () => !expect(actual).toBeFalsy(),
  toBeFalsy: () =>
    typeof actual === 'undefined' || actual === null || actual === false || actual === 0 || actual === '',
});
