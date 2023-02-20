const DaoCity = require("../../dao/city-dao");
const Error = require("./../../api/errors/profiles-error").Create;

class CreateAbl {
  constructor() {
    this.dao = DaoCity;
  }
  async create(dtoIn) {
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      throw new Error.CannotCreate(e);
    }
    return dtoOut;
  }
}
module.exports = new CreateAbl();
