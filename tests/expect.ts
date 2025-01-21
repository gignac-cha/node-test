export const expect = <T>(actual: T) => ({
  toBe: (expected: T) => actual === expected,
  toBeTruthy: () => !expect(actual).toBeFalsy(),
  toBeFalsy: () =>
    typeof actual === 'undefined' || actual === null || actual === false || actual === 0 || actual === '',
});
