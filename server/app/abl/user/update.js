const { STATES } = require("../constants");

class UpdateAbl {
  async update(ctx, dtoIn) {
    const user = await ctx.dao.get(dtoIn.id);
    if (!user) {
      throw new ctx.errors.UserIsNotExist();
    }
    if (user.state !== STATES.ACTIVE) {
      throw new ctx.errors.UserIsNotActiveState();
    }
    let dtoOut;
    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {
      throw new ctx.errors.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = UpdateAbl;
