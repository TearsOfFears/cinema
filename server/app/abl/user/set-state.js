const DaoUser = require("../../dao/user-dao");
const Error = require("./../../api/errors/user-error").SeState;

class SetStateAbl {
  constructor() {
    this.dao = DaoUser;
  }
  async setState(dtoIn) {
    const user = await this.dao.get(dtoIn.id);
    if (!user) {
      throw new Error.UserIsNotExist();
    }
    if (user.state === dtoIn.ACTIVE) {
      throw new Error.UserIsAlreadyInActiveState();
    }
    let dtoOut;
    try {
      dtoOut = await this.dao.setState(dtoIn);
    } catch (e) {
      throw new Error.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = new SetStateAbl();
