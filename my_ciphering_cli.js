const { stderr, exit } = require('process');
const { pipeline } = require('stream');
const customReadable = require('./src/streams/customStreams/customReadable');
const customWritable = require('./src/streams/customStreams/customWritable');
const caesarTransform = require('./src/streams/transformStreams/caesarTransform');
const atobashTransform = require('./src/streams/transformStreams/atobashTransform');

try {
  const readStream = new customReadable('./input.txt');
  const writeStream = new customWritable('./output.txt');
  const caesarDecode = new caesarTransform('C0');
  const atobashDecode = new atobashTransform();
  pipeline(readStream, atobashDecode, writeStream, (err) => {
    if (err) {
      stderr.write('Error: ' + err.message);
      exit(1);
    }
  });
} catch (error) {
  stderr.write('Errorrr');
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
