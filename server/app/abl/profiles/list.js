const DaoUser = require("../../dao/user-dao");

class ListAbl {
  constructor() {
    this.dao = DaoUser;
  }
  async list(dtoIn) {
    dtoIn.pageInfo ||= {};
    dtoIn.pageInfo.pageSize ||= 10;
    dtoIn.pageInfo.pageIndex ||= 0;
    const users = await this.dao.list(dtoIn);
    return users;
  }
}
module.exports = new ListAbl();
