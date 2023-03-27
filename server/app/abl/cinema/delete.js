const Cinema = require("./cinema");

class DeleteAbl extends Cinema {
  constructor(ctx) {
    super(ctx);
  }
  async delete() {
    await super.getCinemaAndActiveState(this.dtoIn.id);
    try {
      await this.dao.delete(this.dtoIn.id);
    } catch (e) {
      throw new this.errors.CannotDelete(e);
    }
    return this.dtoIn;
  }
}

module.exports = DeleteAbl;
