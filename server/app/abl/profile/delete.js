const DaoUser = require("../../dao/user-dao");
const DeleteError = require("./../../api/errors/user-error").Delete;
const { STATES } = require("./constants");
class DeleteAbl {
  constructor() {
    this.dao = DaoUser;
  }
  async delete(dtoIn) {
    const user = await this.dao.get(dtoIn.id);
    if (!user) {
      throw new DeleteError.UserIsNotExist();
    }
    if (user.state === STATES.ACTIVE) {
      throw new DeleteError.UserIsActiveState();
    }
    try {
      await this.dao.delete(dtoIn.id);
    } catch (e) {
      throw new DeleteError.CannotDelete();
    }
    return dtoIn;
  }
}

module.exports = new DeleteAbl();
