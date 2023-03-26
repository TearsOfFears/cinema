class SetStateAbl {
  async setState(ctx, dtoIn) {
    console.log("ctx", ctx);
    const user = await ctx.dao.get(dtoIn.id);
    if (!user) {
      throw new ctx.errors.UserIsNotExist();
    }
    if (user.state === dtoIn.ACTIVE) {
      throw new ctx.errors.UserIsAlreadyInActiveState();
    }
    let dtoOut;
    try {
      dtoOut = await ctx.dao.setState(dtoIn);
    } catch (e) {
      throw new ctx.errors.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = SetStateAbl;
