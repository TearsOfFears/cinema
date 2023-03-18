const DaoMovies = require("../../dao/movie-dao");
const { STATES } = require("./constants");
const Error = require("./../../api/errors/movie-error").Update;
const Movie = require("./show");
const { Create: Errors } = require("../../api/errors/movie-error");
class UpdateAbl extends Movie {
  constructor() {
    super();
    this.dao = DaoMovies;
  }
  async update(dtoIn) {
    let dtoOut;
    const movie = await this.dao.get(dtoIn.id);
    try {
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {
      throw new Error.CannotUpdate();
    }
    return dtoOut;
  }
}
module.exports = new UpdateAbl();
