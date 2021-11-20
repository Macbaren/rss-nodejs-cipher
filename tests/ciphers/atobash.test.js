const { expect } = require('@jest/globals');

const { atobash } = require('../../src/ciphers/atobash');

test('should return reverse latin charachter', () => {
  const str = 'Aa Ee Mm Pp Xx Zz 123+-кирилица';
  const { caesarDecode } = atobash;
  expect(caesarDecode(str)).toBe('Bb Ff Nn Oo Yy Aa 123+-кирилица');
});
