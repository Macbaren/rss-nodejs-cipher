const { stderr, exit, stdin, stdout } = require('process');
const { pipeline } = require('stream');

const configValidator = require('./src/configValidator');
const customReadable = require('./src/streams/customStreams/customReadable');
const customWritable = require('./src/streams/customStreams/customWritable');
const CaesarTransform = require('./src/streams/transformStreams/CaesarTransform');
const AtobashTransform = require('./src/streams/transformStreams/AtobashTransform');
const Rot8Transform = require('./src/streams/transformStreams/Rot8Transform');

try {
  configValidator.configCheck(); // проверка на отутствие ошибок в конфиге

  const readStream = (inputPath = configValidator.getFlagValue('-i'))
    ? new customReadable(inputPath)
    : stdin; // получение адреса инпута или ожидаение его ввода в КС

  const writeStream = (outputPath = configValidator.getFlagValue('-o'))
    ? new customWritable(outputPath)
    : stdout; // получение адреса аутпута или ожидание его ввода в КС

  //через объект почему-то не работает ХЗ???
  // const transformStreamsObj = { //
  //   C0: new CaesarTransform('C0'),
  //   C1: new CaesarTransform('C1'),
  //   R0: new Rot8Transform('R0'),
  //   R1: new Rot8Transform('R1'),
  //   A: new AtobashTransform(),
  // };

  // const ciphersArr = configValidator
  //   .getFlagValue('-c')
  //   .split('-')
  //   .map((it) => transformStreamsObj[it]); // получение массива шифров и трансформклассов из него
  // console.log('ciphers', ciphersArr.length);

  let transformsArray = [];
  configValidator
    .getFlagValue('-c')
    .split('-')
    .forEach((el) => {
      switch (el) {
        case 'C1':
          transformsArray.push(new CaesarTransform('C1'));
          break;

        case 'C0':
          transformsArray.push(new CaesarTransform('C0'));
          break;

        case 'R1':
          transformsArray.push(new Rot8Transform('R1'));
          break;

        case 'R0':
          transformsArray.push(new Rot8Transform('R0'));
          break;

        case 'A':
          transformsArray.push(new AtobashTransform());
          break;

        default:
          break;
      }
    });

  pipeline(readStream, ...transformsArray, writeStream, (err) => {
    if (err) {
      stderr.write('Error: ' + err.message);
      exit(1);
    }
  });
} catch (error) {
  stderr.write('Errorrr', error);
  exit(1);
}

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
