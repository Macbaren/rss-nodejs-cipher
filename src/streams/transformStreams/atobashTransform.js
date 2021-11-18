const { Transform } = require('stream');
const atobash = require('../../ciphers/atobash');

class atobashTransform extends Transform {
  constructor(options) {
    super(options);
    this.encode = options;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = atobash(chunk.toString('utf8'));

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = atobashTransform;
