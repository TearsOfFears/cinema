const { STATES } = require("../constants");
const Error = require("../../api/errors/show-error").List;
const Show = require("./show");
class ListAbl extends Show {
  constructor() {
    super();
  }
  async list(dtoIn) {
    dtoIn.pageInfo ||= {};
    dtoIn.pageInfo.pageSize ||= 10;
    dtoIn.pageInfo.pageIndex ||= 0;
    dtoIn.state ||= STATES.PASSIVE;
    let shows;
    try {
      shows = await this.dao.list(dtoIn);
    } catch (e) {
      throw new Error.CannotList(e);
    }

    return shows;
  }
}
module.exports = new ListAbl();
