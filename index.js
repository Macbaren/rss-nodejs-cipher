const fs = require('fs');
const { pipeline } = require('stream');

const text = './node-rss/crypt/input.txt';
const ceasar = require('./caesar');

const processArgs = process.argv;

// const configArr = process.argv[3].split('-').map(it);
const inputTxtPath = process.argv[5];
const outputTxtPath = process.argv[7];

const readable = fs.createReadStream(text);
// const writable = fs.createWriteStream('./node-rss/crypt/output.txt');

// readable.pipe(writable);

// console.log(configArr);

pipeline(
  readable,
  ceasar.caesarCode(readable.toString()),
  fs.createWriteStream('./node-rss/crypt/output.txt'),
  (err) => {
    if (err) {
      console.error('Pipeline failed.', err);
    } else {
      console.log('Pipeline succeeded.');
    }
  }
);

// console.log(t);

// const readStream = fileSystem.createReadStream('input.txt');
// const writeStream = fileSystem.createWriteStream('output.txt');

// readStream.on('data', function(chunk) {
//   text = decodeCaeser(chunk.toString())
//   writeStream.write(text)
// })

// pipeline(input, ...transformsArr, output, (err) => {}
