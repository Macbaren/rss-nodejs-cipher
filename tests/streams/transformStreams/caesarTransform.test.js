const CaesarTransform = require('../../../src/streams/transformStreams/caesarTransform');
const Transform = require('stream');
const { expect } = require('@jest/globals');

const caesarTransformStream = new CaesarTransform();

test('should be instanse of Transformstream', () => {
  expect(caesarTransformStream instanceof Transform).toBe(true);
});
