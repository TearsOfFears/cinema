const DaoMovie = require("../../dao/movie-dao");
const Error = require("./../../api/errors/movie-error").SetState;
const Movie = require("./movie");
class SetStateAbl extends Movie {
  constructor() {
    super();
    this.dao = DaoMovie;
  }
  async setState(dtoIn) {
    await super.checkMovieExistAndState(dtoIn, Error);
    let dtoOut;
    try {
      dtoOut = await this.dao.setState(dtoIn);
    } catch (e) {
      throw new Error.CannotUpdate(e);
    }
    return dtoOut;
  }
}
module.exports = new SetStateAbl();
