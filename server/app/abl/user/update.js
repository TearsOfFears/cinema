const { STATES } = require("../constants");
const User = require("./user");

class UpdateAbl extends User {
  constructor(ctx) {
    super(ctx);
  }
  async update() {
    const user = await this.dao.get(this.dtoIn.id);
    if (!user) {
      throw new this.errors.UserIsNotExist();
    }
    if (user.state !== STATES.ACTIVE) {
      throw new this.errors.UserIsNotActiveState();
    }
    let dtoOut;
    try {
      dtoOut = await this.dao.update(this.dtoIn);
    } catch (e) {
      throw new this.errors.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = UpdateAbl;
