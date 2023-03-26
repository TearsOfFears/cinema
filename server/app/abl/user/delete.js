const { STATES } = require("../constants");
const User = require("./user");
class DeleteAbl extends User {
  constructor(ctx) {
    super(ctx);
  }
  async delete(ctx, dtoIn) {
    console.log("dto in", dtoIn);
    const user = await this.dao.get(dtoIn.id);
    if (!user) {
      throw new this.errors.UserIsNotExist();
    }
    if (user.state === STATES.ACTIVE) {
      throw new this.errors.UserIsActiveState();
    }
    try {
      await this.dao.delete(dtoIn.id);
    } catch (e) {
      throw new this.errors.CannotDelete();
    }
    return dtoIn;
  }
}

module.exports = DeleteAbl;
