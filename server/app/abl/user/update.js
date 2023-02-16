const DaoUser = require("../../dao/user-dao");
const { STATES } = require("./constants");
const Error = require("./../../api/errors/user-error").Update;

class UpdateAbl {
  constructor() {
    this.dao = DaoUser;
  }
  async update(dtoIn) {
    const user = await this.dao.get(dtoIn.id);
    if (!user) {
      throw new Error.UserIsNotExist();
    }
    if (user.state !== STATES.ACTIVE) {
      throw new Error.UserIsNotActiveState();
    }
    let dtoOut;
    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {
      console.log(e);
      throw new Error.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = new UpdateAbl();
