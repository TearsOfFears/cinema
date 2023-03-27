const { STATES } = require("../constants");
const User = require("./user");

class GetAbl extends User {
  constructor(ctx) {
    super(ctx);
  }
  async get() {
    const user = await this.dao.get(this.dtoIn.id);
    if (!user) {
      throw new this.errors.UserIsNotExist();
    }
    if (user.state !== STATES.ACTIVE) {
      throw new this.errors.UserIsNotActiveState();
    }
    return user;
  }
}
module.exports = GetAbl;
