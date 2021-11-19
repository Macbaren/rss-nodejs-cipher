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

class IncorrectCiphers extends MyError {
  constructor() {
    super('You entered incorrect ciphers sequense');
  }
}

module.exports = { EmptyConfig, FlagDuplicate, NoConfigFlag, IncorrectCiphers };
