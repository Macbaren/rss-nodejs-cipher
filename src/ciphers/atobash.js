const LAST_UPPERCASED = 90;
const CENTER_OF_UPPERCASED = 77;
const CENTER_OF_LOWERCASED = 109;

const atobash = (str) => {
  const cipherEl = (ch) => {
    const chToNum = ch.charCodeAt(0);
    if (chToNum <= LAST_UPPERCASED) {
      return String.fromCharCode(
        chToNum + (CENTER_OF_UPPERCASED - chToNum) * 2 + 1
      );
    } else {
      return String.fromCharCode(
        chToNum + (CENTER_OF_LOWERCASED - chToNum) * 2 + 1
      );
    }
  };

  return str
    .toString()
    .split('')
    .map((it) => (/[a-zA-Z]/.test(it) ? cipherEl(it) : it))
    .join('');
};

module.exports = atobash;
