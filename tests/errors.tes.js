const EmptyConfig = require('../src/errors');
// const Readable = require('stream');
const { expect } = require('@jest/globals');

const testEmptyConfig = new EmptyConfig();

test('should be instanse of Error', () => {
  expect(testEmptyConfig instanceof Error).toBe(true);
});
