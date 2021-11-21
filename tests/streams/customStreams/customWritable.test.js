const customWritable = require('../../../src/streams/customStreams/customWritable');
const Writable = require('stream');
const { expect } = require('@jest/globals');

const PATH = './output.txt';

const customWritableStream = new customWritable(PATH);

test('should be instanse of Writable Stream', () => {
  expect(customWritableStream instanceof Writable).toBe(true);
});
