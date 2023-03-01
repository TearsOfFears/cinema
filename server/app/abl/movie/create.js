const DaoMovie = require("../../dao/movie-dao");
const Errors = require("./../../api/errors/movie-error").Create;
const Movie = require("./movie");
const { STATES, ERRORS_CODES } = require("./constants");
const ImdbApi = require("./../../api/components/imdbApi");
class CreateAbl extends Movie {
  constructor() {
    super();
    this.dao = DaoMovie;
  }
  async createByManual(dtoIn) {
    let dtoOut;
    dtoIn.state = STATES.PASSIVE;
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
  async createByImdb(dtoIn) {
    let dtoOut;
    dtoIn.state = STATES.PASSIVE;
    dtoIn.genre = await this._getMovieGenres(dtoIn, Errors);
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
  async _getMovieGenres(dtoIn, Errors) {
    const url = new URL(dtoIn.imdbLink);
    let movieId = url.pathname
      .split("/")
      .filter((el) => (el.match(/^[t-t]{2}/) ? el : null))[0];
    const imdbInstance = super.createObject(ImdbApi, Errors);
    return await imdbInstance.getGenres({ movieId });
  }
}
module.exports = new CreateAbl();
