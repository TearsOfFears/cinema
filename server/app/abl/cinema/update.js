const Cinema = require("./cinema");
class UpdateAbl extends Cinema {
  constructor(ctx) {
    super(ctx);
  }
  async update(dtoIn) {
    let dtoOut;
    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {
      throw new this.errors.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = UpdateAbl;
