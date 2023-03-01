const DaoCinema = require("../../dao/cinema-dao");
const Error = require("./../../api/errors/cinema-error").Create;
const CountryApi = require("./../../api/components/countryApi");
const { ERRORS_CODES, STATES } = require("./../constants");
class CreateAbl {
  constructor() {
    this.dao = DaoCinema;
  }
  async create(dtoIn) {
    let dtoOut;
    dtoIn.state = STATES.ACTIVE;
    await this.getCity(dtoIn, Error);
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e.name === ERRORS_CODES.DUPLICATE) {
        throw new Error.CinemaNameAlreadyExist();
      }
      throw new Error.CannotCreate(e);
    }
    return dtoOut;
  }
  async getCity(dtoIn, errors) {
    const countryInstance = new CountryApi(Error);
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
