const { STATES } = require("../constants");
const User = require("./user");
class DeleteAbl extends User {
  constructor(ctx) {
    super(ctx);
  }
  async delete() {
    const user = await this.dao.get(this.dtoIn.id);
    if (!user) {
      throw new this.errors.UserIsNotExist();
    }
    if (user.state === STATES.ACTIVE) {
      throw new this.errors.UserIsActiveState();
    }
    try {
      await this.dao.delete(this.dtoIn.id);
    } catch (e) {
      throw new this.errors.CannotDelete();
    }
    return this.dtoIn;
  }
}

module.exports = DeleteAbl;
