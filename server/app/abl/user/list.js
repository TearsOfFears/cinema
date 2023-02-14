const DaoUser = require("../../dao/user-dao");

class ListAbl {
  constructor() {
    this.dao = DaoUser;
  }
  async list(dtoIn) {
    const users = await this.dao.list();
    return users;
  }
}
module.exports = new ListAbl();
