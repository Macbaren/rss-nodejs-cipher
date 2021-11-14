const fs = require('fs');
const { pipeline } = require('stream');
const { Transform } = require('stream');

const rot8 = (config) => {
  const isTemp = !!fs.readFileSync('./temp.txt').toString().length;
  let path = isTemp ? './temp.txt' : './input.txt';

  const readStream = fs.createReadStream(path, 'utf-8');
  const writeStream = fs.createWriteStream('./output.txt');

  // комментарии в файле caesar
  const rot8Stream = new Transform({
    transform(data, encoding, callback) {
      const rot8Encode = (str, conf) => {
        const encode = conf === 'R1';
        const addShift = encode ? 8 : -8;
        console.log('shift', addShift);

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
      const cipherIt = rot8Encode(data, config);
      this.push(cipherIt);

      fs.writeFile('./temp.txt', cipherIt, (err) => {
        if (err) throw err;
      });
      console.log('rot-8', data, cipherIt, config);

      callback();
      const rewrite = () => {
        fs.writeFile(
          './temp.txt',
          fs.readFileSync('./output.txt').toString(),
          (err) => {
            if (err) throw err;
          }
        );
      };
      rewrite();
    },
  });

  pipeline(readStream, rot8Stream, writeStream, (err) => {
    if (err) console.log('error', err);
  });
};

module.exports = rot8;
