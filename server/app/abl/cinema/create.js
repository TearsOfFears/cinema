const DaoCinema = require("../../dao/cinema-dao");
const Error = require("./../../api/errors/profiles-error").Create;

class CreateAbl {
  constructor() {
    this.dao = DaoCinema;
  }
  async create(dtoIn) {
    let dtoOut;
    dtoIn.state = "active";
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      throw new Error.CannotCreate(e);
    }
    return dtoOut;
  }
}
module.exports = new CreateAbl();
