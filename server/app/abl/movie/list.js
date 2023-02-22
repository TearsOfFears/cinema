const DaoCinema = require("../../dao/cinema-dao");
const { STATES } = require("../constants");
const Error = require("../../api/errors/cinema-error").Get;

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
      console.log("e", e);
      throw new Error.ProfileIsNotExist();
    }

    return users;
  }
}
module.exports = new ListAbl();
