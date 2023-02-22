const DaoProfiles = require("../../dao/cinema-dao");
const { STATES } = require("./constants");
const Error = require("../../api/errors/profiles-error").Get;

class GetAbl {
  constructor() {
    this.dao = DaoProfiles;
  }
  async get(dtoIn) {
    let user;
    try {
      user = await this.dao.get(dtoIn.id);
    } catch (e) {
      console.log(e);
    }
    if (!user) {
      throw new Error.ProfileIsNotExist();
    }
    return user;
  }
}
module.exports = new GetAbl();
