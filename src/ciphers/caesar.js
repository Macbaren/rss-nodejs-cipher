const LAST_UPPERCASED = 90;
const FIRST_UPPERCASED = 65;
const LAST_LOWERCASED = 122;
const FIRST_LOWERCASED = 97;
const ALBHABET_LENGTH = 26;

const caesar = (str, conf) => {
  const encode = conf === 'C1'; // определение конфига
  const addShift = encode ? 1 : -1; // определение сдвига

  const cipherEl = (ch) => {
    const chToNum = ch.charCodeAt(0);
    const registr = encode
      ? chToNum <= LAST_UPPERCASED
        ? FIRST_UPPERCASED
        : FIRST_LOWERCASED
      : chToNum <= LAST_UPPERCASED
      ? LAST_UPPERCASED
      : LAST_LOWERCASED;
    return String.fromCharCode(
      registr + ((chToNum + addShift - registr) % ALBHABET_LENGTH)
    );
  };

  return str
    .toString()
    .split('')
    .map((it) => (/[a-zA-Z]/.test(it) ? cipherEl(it) : it))
    .join('');
};

module.exports = caesar;
