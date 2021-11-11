const { stdin, stdout } = process;

stdout.write('Whats your name?\n');

stdin.on('data', (data) => {
  stdout.write(`Hello ${data}!`);
  const dataStr = data.toString();

  process.on('exit', (code) => {
    if (code === 0) {
      stdout.write(`Thank you ${data} and bye`);
      stdout.write(dataStr.split('').reverse().join(''));
    } else {
      stdout.write('Something wrong!');
    }
  });
  process.exit();
});
