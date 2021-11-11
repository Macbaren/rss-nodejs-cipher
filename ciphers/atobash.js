const str = 'This is secret. Message about "_" symbol!'; // Wklv A-65 a-97

const caesarCode = (str) => {
  const cryptEl = (ch) => {
    const chToNum = ch.charCodeAt(0);
    if (chToNum < 91) {
      return String.fromCharCode(chToNum + (77 - chToNum) * 2 + 1);
    } else {
      return String.fromCharCode(chToNum + (109 - chToNum) * 2 + 1);
    }
  };
  return str
    .split('')
    .map((it) => (/[a-zA-Z]/.test(it) ? cryptEl(it) : it))
    .join('');
};

const str2 = caesarCode(str);
console.log(str2);
console.log(caesarCode(str2));
