// const { expect } = require('@jest/globals');
// const { spawn } = require('child_process');

// const INPUT_TO_REVERSE_CLI = '12345'; // node my_caesar_cli -c C1-C1-A-R0 -c C0

// const cp = spawn('node', [
//   'my_caesar_cli',
//   '-c',
//   'C1-C1-A-R0',
//   '-c',
//   'C0',
//   INPUT_TO_REVERSE_CLI,
// ]);

// let res = '';

// cp.stdout.on('data', (chunk) => {
//   res += chunk.toString();
// });

// let EXPECTED_OUTPUT;

// cp.stdout.on('end', () => {
//   res = res.trim();
//   EXPECTED_OUTPUT = INPUT_TO_REVERSE_CLI.split('').reverse().join('');

//   console.log(
//     `Expect result of processing "${INPUT_TO_REVERSE_CLI}" to be "${EXPECTED_OUTPUT}"`
//   );
//   console.log(`Test result is ${res === EXPECTED_OUTPUT}`);
// });

// test('should return reverse', () => {
//   expect(INPUT_TO_REVERSE_CLI).toBe(EXPECTED_OUTPUT);
// });
