const str = 'This is secret. Message about "_" symbol!'; // Wklv A-65 a-97

const rot8Code = (str) => {
  const cryptEl = (ch) => {
    const chToNum = ch.charCodeAt(0);
    const registr = chToNum < 91 ? 65 : 97;
    console.log(ch, chToNum, registr, (chToNum + 8) % registr);
    return String.fromCharCode(registr + ((chToNum + 8 - registr) % 26));
  };
  return str
    .split('')
    .map((it) => (/[a-zA-Z]/.test(it) ? cryptEl(it) : it))
    .join('');
};

const str2 = rot8Code(str);
console.log(str2);

const rot8Decode = (str) => {
  const cryptEl = (ch) => {
    const chToNum = ch.charCodeAt(0);
    const registr = chToNum < 91 ? 90 : 122;
    return String.fromCharCode(registr + ((chToNum - 8 - registr) % 26));
  };
  return str
    .split('')
    .map((it) => (/[a-zA-Z]/.test(it) ? cryptEl(it) : it))
    .join('');
};

console.log(rot8Decode(str2));
