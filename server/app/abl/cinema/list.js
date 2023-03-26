const { STATES } = require("../constants");

class ListAbl {
  async list(ctx, dtoIn) {
    dtoIn.pageInfo ||= {};
    dtoIn.pageInfo.pageSize ||= 10;
    dtoIn.pageInfo.pageIndex ||= 0;
    dtoIn.state ||= STATES.ACTIVE;
    let users;
    try {
      users = await ctx.dao.list(dtoIn);
    } catch (e) {
      throw new ctx.errors.CannotList(e);
    }
    return users;
  }
}
module.exports = ListAbl;
