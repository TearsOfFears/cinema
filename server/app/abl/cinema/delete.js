const Cinema = require("./cinema");
const path = require("path");
const errors = {
  entity: path.basename(module.path),
  cmd: path.basename(__filename, ".js"),
};
class DeleteAbl {
  constructor() {
    // super();
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

module.exports = new DeleteAbl();
