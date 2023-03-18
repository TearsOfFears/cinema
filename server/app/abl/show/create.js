const { Create } = require("./../../api/errors/show-error");
const Show = require("./show");
const { STATES } = require("./constants");
class CreateAbl extends Show {
  constructor() {
    super();
  }
  async create(dtoIn) {
    let dtoOut;
    dtoIn.state = STATES.PASSIVE;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      throw new Create.CannotCreate(e);
    }
    return dtoOut;
  }
}
module.exports = new CreateAbl();
