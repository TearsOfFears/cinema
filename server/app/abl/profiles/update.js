const DaoProfiles = require("../../dao/profiles-dao");
const Error = require("./../../api/errors/profiles-error").Update;

class UpdateAbl {
  constructor() {
    this.dao = DaoProfiles;
  }
  async update(dtoIn) {
    let dtoOut;
    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {
      throw new Error.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = new UpdateAbl();
