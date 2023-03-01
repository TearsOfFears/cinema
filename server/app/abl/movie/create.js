const DaoMovie = require("../../dao/movie-dao");
const Errors = require("./../../api/errors/movie-error").Create;
const Movie = require("./movie");
const { STATES, ERRORS_CODES } = require("./constants");
class CreateAbl extends Movie {
  constructor() {
    super();
    this.dao = DaoMovie;
  }
  async create(dtoIn) {
    let dtoOut;
    dtoIn.state = STATES.ACTIVE;
    await super.getCountry(dtoIn, Errors);
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e.name === ERRORS_CODES.DUPLICATE) {
        throw new Errors.MovieNameAlreadyExist();
      }
      throw new Errors.CannotCreate(e);
    }
    return dtoOut;
  }
}
module.exports = new CreateAbl();
