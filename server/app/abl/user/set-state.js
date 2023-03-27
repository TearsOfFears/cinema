const User = require("./user");
class SetStateAbl extends User {
  constructor(ctx) {
    super(ctx);
  }
  async setState() {
    const user = await this.dao.get(this.dtoIn.id);
    if (!user) {
      throw new this.errors.UserIsNotExist();
    }
    if (user.state === this.dtoIn.ACTIVE) {
      throw new this.errors.UserIsAlreadyInActiveState();
    }
    let dtoOut;
    try {
      dtoOut = await this.dao.setState(this.dtoIn);
    } catch (e) {
      throw new this.errors.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = SetStateAbl;
