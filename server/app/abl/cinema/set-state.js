const { STATES } = require("./constants");
const Cinema = require("./cinema");
class SetStateAbl extends Cinema {
  constructor(ctx) {
    super(ctx);
  }
  async setState(ctx, dtoIn) {
    await super.getCinema(this.dtoIn.id);
    let dtoOut;
    try {
      dtoOut = await this.dao.setState(this.dtoIn);
    } catch (e) {
      throw new this.errors.CannotSetState();
    }
    return dtoOut;
  }
}
module.exports = SetStateAbl;
