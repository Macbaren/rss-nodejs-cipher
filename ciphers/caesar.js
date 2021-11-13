const fs = require('fs');
const { pipeline } = require('stream');
const { Transform } = require('stream');

const caesar = (config) => {
  const isTemp = !!fs.readFileSync('./temp.txt').toString().length;
  let path = isTemp ? './temp.txt' : './input.txt';

  const readStream = fs.createReadStream(path, 'utf-8');
  const writeStream = fs.createWriteStream('./output.txt');

  const caesarStream = new Transform({
    transform(data, encoding, callback) {
      const caesarEncode = (str, conf) => {
        const encode = conf === 'C1';
        const addShift = encode ? 1 : -1;

        const cipherEl = (ch) => {
          const chToNum = ch.charCodeAt(0);
          const registr = encode
            ? chToNum < 91
              ? 65
              : 97
            : chToNum < 91
            ? 90
            : 122;
          return String.fromCharCode(
            registr + ((chToNum + addShift - registr) % 26)
          );
        };
        return str
          .toString()
          .split('')
          .map((it) => (/[a-zA-Z]/.test(it) ? cipherEl(it) : it))
          .join('');
      };
      const cipherIt = caesarEncode(data, config);
      this.push(cipherIt);

      fs.writeFile('./temp.txt', cipherIt, (err) => {
        if (err) throw err;
      });
      console.log('caesar', cipherIt, path, config);

      callback();
    },
  });

  pipeline(readStream, caesarStream, writeStream, (err) => {
    if (err) console.log('error', err);
  });
};

module.exports = caesar;
