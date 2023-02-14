const DaoUser = require("../../dao/user-dao");
const Error = require("./../../api/errors/user-error").Update;

class UpdateAbl {
  constructor() {
    this.dao = DaoUser;
  }
  async update(dtoIn) {
    const userExist = await this.dao.get(dtoIn.id);
    if (!userExist) {
      throw new Error.UserIsNotExist();
    }
    let user;
    try {
      user = await this.dao.update(dtoIn);
    } catch (e) {
      throw new Error.CannotUpdate();
    }
    return user;
  }
}
module.exports = new UpdateAbl();
