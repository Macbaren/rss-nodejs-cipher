const { Transform } = require('stream');
const rot8 = require('../../ciphers/rot-8');

class rot8Transform extends Transform {
  constructor(options) {
    super(options);
    this.encode = options;
  }

  _transform(chunk, encoding, callback) {
    try {
      const resultString = rot8(chunk.toString('utf8'), this.encode);

      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = rot8Transform;
