const rot8 = (str, conf) => {
  const encode = conf === 'R1';
  const addShift = encode ? 8 : -8;

  const cipherEl = (ch) => {
    const chToNum = ch.charCodeAt(0);
    const registr = encode ? (chToNum < 91 ? 65 : 97) : chToNum < 91 ? 90 : 122;
    return String.fromCharCode(registr + ((chToNum + addShift - registr) % 26));
  };
  return str
    .toString()
    .split('')
    .map((it) => (/[a-zA-Z]/.test(it) ? cipherEl(it) : it))
    .join('');
};

module.exports = rot8;
