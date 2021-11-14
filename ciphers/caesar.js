const fs = require('fs');
const { pipeline } = require('stream');
const { Transform } = require('stream');

const caesar = (config) => {
  const isTemp = !!fs.readFileSync('./temp.txt').toString().length; // определение пути для 1го прохода
  let path = isTemp ? './temp.txt' : './input.txt'; // если в temp еще пусто, то из input

  const readStream = fs.createReadStream(path, 'utf-8');
  const writeStream = fs.createWriteStream('./output.txt');
  // console.log('path', path);

  const caesarStream = new Transform({
    transform(data, encoding, callback) {
      // функция кодировки в зависимости от переданного конфига
      const caesarEncode = (str, conf) => {
        const encode = conf === 'C1'; // определение конфига
        const addShift = encode ? 1 : -1; // определение сдвига

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

      callback();
      // перезапись данных из оутпута в темп для последующих вызовов функций
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

  pipeline(readStream, caesarStream, writeStream, (err) => {
    if (err) console.log('error', err);
  });
};

module.exports = caesar;
