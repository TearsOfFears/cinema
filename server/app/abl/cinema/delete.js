const Cinema = require("./cinema");

class DeleteAbl extends Cinema {
  constructor(ctx) {
    super(ctx);
  }
  async delete(dtoIn) {
    await super.getCinemaAndActiveState(dtoIn.id);
    try {
      await this.dao.delete(dtoIn.id);
    } catch (e) {
      throw new this.errors.CannotDelete(e);
    }
    return dtoIn;
  }
}

module.exports = DeleteAbl;
