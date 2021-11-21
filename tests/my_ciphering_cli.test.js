const { spawn } = require('child_process');

const INPUT_TO_REVERSE_CLI = '12345';

const cp = spawn('node', ['reverse-cli.js', '--input', INPUT_TO_REVERSE_CLI]);

let res = '';

cp.stdout.on('data', (chunk) => {
  res += chunk.toString();
});

cp.stdout.on('end', () => {
  // This is to remove LF
  res = res.trim();

  const EXPECTED_OUTPUT = INPUT_TO_REVERSE_CLI.split('').reverse().join('');

  console.log(
    `Expect result of processing "${INPUT_TO_REVERSE_CLI}" to be "${EXPECTED_OUTPUT}"`
  );

  console.log(`Test result is ${res === EXPECTED_OUTPUT}`);
});
