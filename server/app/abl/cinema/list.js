const { STATES } = require("../constants");
const Cinema = require("./cinema");
class ListAbl extends Cinema {
  constructor(ctx) {
    super(ctx);
  }
  async list() {
    this.dtoIn.pageInfo ||= {};
    this.dtoIn.pageInfo.pageSize ||= 10;
    this.dtoIn.pageInfo.pageIndex ||= 0;
    this.dtoIn.state ||= STATES.ACTIVE;
    let users;
    try {
      users = await this.dao.list(this.dtoIn);
    } catch (e) {
      throw new this.errors.CannotList(e);
    }
    return users;
  }
}
module.exports = ListAbl;
