const CountryApi = require("./../../api/components/countryApi");
const { ERRORS_CODES, STATES } = require("./../constants");
const Cinema = require("./cinema");
class CreateAbl extends Cinema {
  constructor(ctx) {
    super(ctx);
  }
  async create() {
    let dtoOut;
    this.dtoIn.state = STATES.PASSIVE;
    await this.getCity(this.dtoIn, this.errors);
    try {
      dtoOut = await this.dao.create(this.dtoIn);
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
module.exports = CreateAbl;
