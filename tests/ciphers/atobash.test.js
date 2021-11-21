const { expect } = require('@jest/globals');

const atobash = require('../../src/ciphers/atobash');

let str;
let fn;

beforeEach(() => {
  str = 'Aa Bb Cc Xx Yy Zz 123+-кирилица';
  fn = atobash(str);
});

test('should not be undefined', () => {
  expect(fn).not.toBeUndefined();
});

test('should be a string', () => {
  expect(typeof fn).toBe('string');
});

test('should return reverse latin charachter', () => {
  expect(fn).toBe('Zz Yy Xx Cc Bb Aa 123+-кирилица');
});
