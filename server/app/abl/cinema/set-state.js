const { STATES } = require("./constants");
const Cinema = require("./cinema");
class SetStateAbl extends Cinema {
  constructor(ctx) {
    super(ctx);
  }
  async setState(dtoIn) {
    const user = await this.dao.get(dtoIn.id);
    if (!user) {
      throw new this.errors.UserIsNotExist();
    }
    if (user.state !== STATES.ACTIVE) {
      throw new this.errors.UserIsNotActiveState();
    }
    let dtoOut;
    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {
      throw new this.errors.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = SetStateAbl;
