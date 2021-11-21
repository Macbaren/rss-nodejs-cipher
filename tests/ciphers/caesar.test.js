const { expect, beforeEach } = require('@jest/globals');
const { describe } = require('yargs');

const caesar = require('../../src/ciphers/caesar');

let str;
let config;
let fn;

beforeEach(() => {
  str = 'Aa Ee Mm Pp Xx Zz 123+-кирилица';
  config = 1;
  fn = caesar(str, config);
});

test('should not be undefined', () => {
  expect(fn).not.toBeUndefined();
});

test('should be a string', () => {
  expect(typeof fn).toBe('string');
});

test('should return next latin charachter', () => {
  expect(fn).toBe('Bb Ff Nn Qq Yy Aa 123+-кирилица');
});

describe('caesar encode', () => {
  beforeEach(() => {
    str = 'Aa Ee Mm Pp Xx Zz 123+-кирилица';
    config = -1;
    fn = caesar(str, config);
  });

  test('should return previous latin charachter', () => {
    expect(fn).toBe('Zz Dd Ll Oo Ww Yy 123+-кирилица');
  });
});
