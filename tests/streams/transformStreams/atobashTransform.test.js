const AtobashTransform = require('../../../src/streams/transformStreams/atobashTransform');
const Transform = require('stream');
const { expect } = require('@jest/globals');

const atobashTransformStream = new AtobashTransform();

test('should be instanse of Transformstream', () => {
  expect(atobashTransformStream instanceof Transform).toBe(true);
});
