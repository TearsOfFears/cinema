const bcrypt = require("bcrypt");

class passwordHashing {
  constructor() {
    this.crypto = bcrypt;
  }
  generatePassword(password) {
    const salt = this.crypto.genSaltSync(8);
    return this.crypto.hashSync(password, salt);
  }
  async verifyPassword(password, user) {
    return await this.crypto.compare(password, user.passwordHash);
  }
}

module.exports = new passwordHashing();
