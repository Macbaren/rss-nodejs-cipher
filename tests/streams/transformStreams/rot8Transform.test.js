const rot8Transform = require('../../../src/streams/transformStreams/rot8Transform');
const Transform = require('stream');
const { expect } = require('@jest/globals');

const rot8TransformStream = new rot8Transform();

test('should be instanse of Transformstream', () => {
  expect(rot8TransformStream instanceof Transform).not.toBe(false);
});
