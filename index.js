const fs = require('fs');
const { stdin, stdout, stderr } = require('process');

const caesar = require('./ciphers/caesar');
const rot8 = require('./ciphers/rot-8');
const atobash = require('./ciphers/atobash');

const config = process.argv.slice(2);
console.log('config', config);

//проверка на наличие конфига
if (config.length === 0) {
  stderr.write('You didnt type any command');
  process.exit(1);
}
// проверка на аутентичность аргументов
if (config.length !== new Set(config).size) {
  stderr.write('You entered encorrect arguments');
  process.exit(1);
}
// проверка на введение флага config
if (config.indexOf('-c') === -1 && config.indexOf('--config') === -1) {
  stderr.write('You have not entered or wrong config flag ');
  process.exit(1);
}

const confFlag = config.indexOf('-c') > -1 ? '-c' : '--config'; // определение актуального флага

const cipherSequense = config[config.indexOf(confFlag) + 1];
const csArr = cipherSequense.split('-'); // получение массива шифров
console.log('config', csArr);

// проверка на валидность последовательности шифров
if (
  csArr.length !== csArr.filter((it) => it).length || // наличие экстра дефисов
  csArr.filter((it) => /C0|C1|R0|R1|A/g.test(it)).length !== csArr.length // валидация шифров
) {
  stderr.write('You entered incorrect ciphers sequense');
  process.exit(1);
}

// проверка на введение флага input
if (config.indexOf('-i') === -1 && config.indexOf('--input') === -1) {
  stderr.write('You have not entered or wrong config flag.');
  process.exit(1);
}

const inputFlag = config.indexOf('-i') > -1 ? '-i' : '--input'; // определение актуального флага
const inputPath = config[config.indexOf(inputFlag) + 1]; // получение адреса инпута

let newPath = '';
if (!fs.existsSync(inputPath)) {
  stderr.write('Wrong input path. Please input actual path');
  stdin.on('data', (data) => {
    newPath = data.toString();
  });
  stdout.write(newPath);
  // process.exit(1);
}
console.log('input', inputPath, newPath);

const cipherObj = {
  // объект с фннкциями по ключу
  C0: caesar,
  C1: caesar,
  R0: rot8,
  R1: rot8,
  A: atobash,
};

// вызов функций исходя из конфига
csArr.forEach((el) => cipherObj[el](el));

// CLI tool should accept 3 options (short alias and full name):

// -c, --config: config for ciphers Config is a string with pattern {XY(-)}n, where:
// X is a cipher mark:

// C is for Caesar cipher (with shift 1)
// A is for Atbash cipher
// R is for ROT-8 cipher
// Y is flag of encoding or decoding (mandatory for Caesar cipher and ROT-8 cipher and should not be passed Atbash cipher)
// 1 is for encoding
// 0 is for decoding
// -i, --input: a path to input file
// -o, --output: a path to output file
// For example, config "C1-C1-R0-A" means "encode by Caesar cipher => encode by Caesar cipher => decode by ROT-8 => use Atbash"

// Details:
// The task must be solved using only pure Node.js. Any libraries and packages (except nodemon, prettier and its plugins, eslint and its plugins)
// are prohibited.
// Config option is required and should be validated. In case of invalid confing human-friendly error should be printed in stderr and the process
// should exit with non-zero status code.
// If any option is duplicated (i.e. bash $ node my_ciphering_cli -c C1-C1-A-R0 -c C0) then human-friendly error should be printed in stderr and
// the process should exit with non-zero status code.
// If the input file option is missed - use stdin as an input source.
// If the output file option is missed - use stdout as an output destination.
// If the input and/or output file is given but doesn't exist or you can't access it (e.g. because of permissions or it's a directory) -
// human-friendly error should be printed in stderr and the process should exit with non-zero status code.
// If passed params are fine the output (file or stdout) should contain transformed content of input (file or stdin).
// For encoding/decoding use only the English alphabet, all other characters should be kept untouched.
// Using streams for reading, writing and transformation of text is mandatory.
// Each cipher is implemented in the form of a transform stream.
// Streams are piped inside each other according to config (you can use .pipe streams instances method or pipeline)
// Usage example:

// $ node my_ciphering_cli -c "C1-C1-R0-A" -i "./input.txt" -o "./output.txt"
// input.txt This is secret. Message about "_" symbol!

// output.txt Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!

// $ node my_ciphering_cli -c "C1-C0-A-R1-R0-A-R0-R0-C1-A" -i "./input.txt" -o "./output.txt"
// input.txt This is secret. Message about "_" symbol!

// output.txt Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!

// $ node my_ciphering_cli -c "A-A-A-R1-R0-R0-R0-C1-C1-A" -i "./input.txt" -o "./output.txt"
// input.txt This is secret. Message about "_" symbol!

// output.txt Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!

// $ node my_ciphering_cli -c "C1-R1-C0-C0-A-R0-R1-R1-A-C1" -i "./input.txt" -o "./output.txt"
// input.txt This is secret. Message about "_" symbol!

// output.txt This is secret. Message about "_" symbol!
