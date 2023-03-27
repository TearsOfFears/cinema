const User = require("./user");
class ListAbl extends User {
  constructor(ctx) {
    super(ctx);
  }
  async list() {
    this.dtoIn.pageInfo ||= {};
    this.dtoIn.pageInfo.pageSize ||= 10;
    this.dtoIn.pageInfo.pageIndex ||= 0;
    const users = await this.dao.list(this.dtoIn);
    return users;
  }
}
module.exports = ListAbl;
