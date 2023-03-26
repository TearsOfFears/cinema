class ListAbl {
  async list(ctx, dtoIn) {
    dtoIn.pageInfo ||= {};
    dtoIn.pageInfo.pageSize ||= 10;
    dtoIn.pageInfo.pageIndex ||= 0;
    const users = await ctx.dao.list(dtoIn);
    return users;
  }
}
module.exports = ListAbl;
