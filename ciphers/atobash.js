const fs = require('fs');
const { pipeline } = require('stream');
const { Transform } = require('stream');

const atobash = () => {
  const isTemp = !!fs.readFileSync('./temp.txt').toString().length;
  let path = isTemp ? './temp.txt' : './input.txt';

  const readStream = fs.createReadStream(path, 'utf-8');
  const writeStream = fs.createWriteStream('./output.txt');

  // комментарии в файле caesar
  const atobashStream = new Transform({
    transform(data, encoding, callback) {
      const atobashEncode = (str) => {
        const cipherEl = (ch) => {
          const chToNum = ch.charCodeAt(0);
          if (chToNum < 91) {
            return String.fromCharCode(chToNum + (77 - chToNum) * 2 + 1);
          } else {
            return String.fromCharCode(chToNum + (109 - chToNum) * 2 + 1);
          }
        };
        return str
          .toString()
          .split('')
          .map((it) => (/[a-zA-Z]/.test(it) ? cipherEl(it) : it))
          .join('');
      };
      const cipherIt = atobashEncode(data);
      this.push(cipherIt);
      fs.writeFile('./temp.txt', cipherIt, (err) => {
        if (err) throw err;
      });
      console.log('atobash', cipherIt);
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
  pipeline(readStream, atobashStream, writeStream, (err) => {
    if (err) console.log('error', err);
  });
};

module.exports = atobash;
