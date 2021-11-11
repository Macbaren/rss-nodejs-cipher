const { stdin, stdout } = process;

const operation = process.argv[2];

stdout.write('Enter 2 nums\n');

stdin.on('data', (data) => {
  const [one, two] = data.toString().split(' ');
  let res = 0;

  if (operation === '-p') {
    res = +one + +two;
    stdout.write(`${one} + ${two} = ${res}`);
  } else if (operation === '-m') {
    res = +one - +two;
    stdout.write(`${one} - ${two} = ${res}`);
  }
  process.exit();
});
