class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class EmptyConfig extends MyError {
  constructor() {
    super('You didnt type anything in CLI');
  }
}

class FlagDuplicate extends MyError {
  constructor() {
    super('You entered dupicated argements');
  }
}

class NoConfigFlag extends MyError {
  constructor() {
    super('You have not entered or wrong config flag ');
  }
}
class BadInputPath extends MyError {
  constructor() {
    super('You entered nonexist input file path');
  }
}
class BadOutputPath extends MyError {
  constructor() {
    super('You entered nonexist output file path');
  }
}
class IncorrectCiphers extends MyError {
  constructor() {
    super('You entered incorrect ciphers sequense');
  }
}

module.exports = {
  EmptyConfig,
  FlagDuplicate,
  NoConfigFlag,
  BadInputPath,
  BadOutputPath,
  IncorrectCiphers,
};
