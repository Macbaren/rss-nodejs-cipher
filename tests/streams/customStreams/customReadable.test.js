const customReadable = require('../../../src/streams/customStreams/customReadable');
const Readable = require('stream');
const { expect } = require('@jest/globals');

const PATH = './input.txt';

const customReadableStream = new customReadable(PATH);

test('should be instanse of Readable Stream', () => {
  expect(customReadableStream instanceof Readable).toBe(true);
});
