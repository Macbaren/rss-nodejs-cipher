// const str = 'This is secret. Messa/ge about "_" symbol!'; // Wklv A-65 a-97

module.exports = {
  caesarCode: (str) => {
    console.log('str', str);
    const cryptEl = (ch) => {
      const chToNum = ch.charCodeAt(0);
      const registr = chToNum < 91 ? 65 : 97;
      return String.fromCharCode(registr + ((chToNum + 1 - registr) % 26));
    };
    return str
      .split('')
      .map((it) => (/[a-zA-Z]/.test(it) ? cryptEl(it) : it))
      .join('');
  },
  caesarDecode: (str) => {
    const cryptEl = (ch) => {
      const chToNum = ch.charCodeAt(0);
      const registr = chToNum < 91 ? 90 : 122;
      return String.fromCharCode(registr + ((chToNum - 1 - registr) % 26));
    };
    return str
      .split('')
      .map((it) => (/[a-zA-Z]/.test(it) ? cryptEl(it) : it))
      .join('');
  },
};
