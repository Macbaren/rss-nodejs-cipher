const {
  EmptyConfig,
  FlagDuplicate,
  NoConfigFlag,
  BadInputPath,
  BadOutputPath,
  IncorrectCiphers,
} = require('./errors');
const fs = require('fs');

// приведение флагов к короткому варианту
const reduceFlag = (f) => {
  return /--config|--input|--output/.test(f) ? f.slice(1, 3) : f;
};
const config = process.argv.slice(2).map((it) => reduceFlag(it)); // перевод флагов конфига в короткие

const configCheck = () => {
  //проверка на наличие конфига
  if (config.length === 0) {
    throw new EmptyConfig();
  }

  // проверка на аутентичность аргументов
  if (config.length !== new Set(config).size) {
    throw new FlagDuplicate();
  }

  // проверка на наличие в вводе флага config
  if (config.indexOf('-c') === -1) {
    throw new NoConfigFlag();
  }

  if (!fs.existsSync(getFlagValue('-i'))) {
    throw new BadInputPath();
  }

  if (!fs.existsSync(getFlagValue('-o'))) {
    throw new BadOutputPath();
  }

  const ciphersArr = getFlagValue('-c').split('-'); // получение массива шифров
  if (
    ciphersArr.length !== ciphersArr.filter((it) => it).length || // наличие экстра дефисов
    ciphersArr.filter((it) => /^C0$|^C1$|^R0$|^R1$|^A$/g.test(it)).length !==
      ciphersArr.length
  ) {
    throw new IncorrectCiphers();
  }
};

const getFlagValue = (flag) => {
  const flagInd = config.indexOf(reduceFlag(flag));
  return flagInd !== -1 ? config[flagInd + 1] : false;
};

module.exports = { configCheck, getFlagValue };
