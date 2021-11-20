const { Transform } = require('stream');

const caesar = require('../../ciphers/caesar');

class CaesarTransform extends Transform {
  constructor(options) {
    super(options);
    this.encode = options;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = caesar(chunk.toString('utf8'), this.encode);

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = CaesarTransform;
