const CountryApi = require("./../../api/components/countryApi");
const { ERRORS_CODES, STATES } = require("./../constants");
const Cinema = require("./cinema");
const path = require("path");
const errors = {
  entity: path.basename(module.path),
  cmd: path.basename(__filename, ".js"),
};
class CreateAbl extends Cinema {
  constructor() {
    super(errors.entity, errors.cmd);
  }
  async create(dtoIn) {
    let dtoOut;
    dtoIn.state = STATES.PASSIVE;
    await this.getCity(dtoIn, this.errors);
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e.name === ERRORS_CODES.DUPLICATE) {
        throw new this.errors.CinemaNameAlreadyExist();
      }
      throw new this.errors.CannotCreate(e);
    }
    return dtoOut;
  }
  async getCity(dtoIn, errors) {
    const countryInstance = new CountryApi(errors);
    const data = await countryInstance.getCityByCode({
      country: dtoIn.location.country,
      state: dtoIn.location.state,
    });
    if (!data.length) {
      throw new errors.CityNotFound();
    }
    const isCityExist = data.some((el) => el.name === dtoIn.location.city);
    if (!isCityExist) {
      throw new errors.CityNotFound();
    }
  }
}
module.exports = new CreateAbl();
