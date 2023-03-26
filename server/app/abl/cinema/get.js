const Cinema = require("./cinema");
class GetAbl extends Cinema {
  constructor(ctx) {
    super(ctx);
  }
  async get(dtoIn) {
    let cinema;
    try {
      cinema = await this.dao.get(dtoIn.id);
    } catch (e) {
      console.log(e);
    }
    if (!cinema) {
      throw new this.errors.ProfileIsNotExist();
    }
    return cinema;
  }
}
module.exports = GetAbl;
