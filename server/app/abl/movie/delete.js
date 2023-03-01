const DaoUser = require("../../dao/movie-dao");
const Error = require("./../../api/errors/movie-error").Delete;
const Movie = require("./movie");
class DeleteAbl extends Movie {
  constructor() {
    super();
    this.dao = DaoUser;
  }
  async delete(dtoIn) {
    await super.checkMovieExistAndState(dtoIn, Error);
    try {
      await this.dao.delete(dtoIn.id);
    } catch (e) {
      throw new Error.CannotDelete(e);
    }
    return dtoIn;
  }
}

module.exports = new DeleteAbl();
