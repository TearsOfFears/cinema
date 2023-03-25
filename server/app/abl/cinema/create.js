const Errors = require("../../helpers/require-helpers").requireUseCaseError();
const CountryApi = require("./../../api/components/countryApi");
const { ERRORS_CODES, STATES } = require("./../constants");
const Cinema = require("./cinema");
class CreateAbl extends Cinema {
  constructor() {
    super(Errors);
  }
  async create(dtoIn) {
    let dtoOut;
    dtoIn.state = STATES.ACTIVE;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e.name === ERRORS_CODES.DUPLICATE) {
        throw new Errors.CinemaNameAlreadyExist();
      }
      throw new Errors.CannotCreate(e);
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
