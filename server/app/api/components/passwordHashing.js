const bcrypt = require("bcryptjs");

class passwordHashing {
  constructor() {
    this.crypto = bcrypt;
  }
  generatePassword(password) {
    const salt = this.crypto.genSaltSync(8);
    return this.crypto.hashSync(password, salt);
  }
  async verifyPassword(password, user) {
    return await this.crypto.compare(password, user.password_hash);
  }
}

module.exports = new passwordHashing();
