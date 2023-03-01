const DaoCinema = require("../../dao/movie-dao");
const { STATES } = require("../constants");
const Error = require("../../api/errors/movie-error").Get;

class ListAbl {
  constructor() {
    this.dao = DaoCinema;
  }
  async list(dtoIn) {
    dtoIn.pageInfo ||= {};
    dtoIn.pageInfo.pageSize ||= 10;
    dtoIn.pageInfo.pageIndex ||= 0;
    dtoIn.state ||= STATES.ACTIVE;
    let users;
    try {
      users = await this.dao.list(dtoIn);
    } catch (e) {
      throw new Error.CannotGetList(e);
    }

    return users;
  }
}
module.exports = new ListAbl();
