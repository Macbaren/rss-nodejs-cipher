const { expect } = require('@jest/globals');

const { caesar } = require('../../src/ciphers/caesar');

test('should return next latin charachter', () => {
  const str = 'Aa Ee Mm Pp Xx Zz 123+-кирилица';
  const config = 'C1';
  const { caesarDecode } = caesar(str, config);
  expect(caesarDecode).toBe('Bb Ff Nn Oo Yy Aa 123+-кирилица');
});
