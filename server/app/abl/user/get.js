const DaoUser = require("../../dao/user-dao");
const { STATES } = require("../constants");
const Error = require("../../api/errors/user-error").Get;

class GetAbl {
  constructor() {
    this.dao = DaoUser;
  }
  async get(dtoIn) {
    const user = await this.dao.get(dtoIn.id);
    if (!user) {
      throw new Error.UserIsNotExist();
    }
    if (user.state !== STATES.ACTIVE) {
      throw new Error.UserIsNotActiveState();
    }
    return user;
  }
}
module.exports = new GetAbl();
