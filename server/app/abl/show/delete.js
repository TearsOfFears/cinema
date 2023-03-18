const DaoShow = require("../../dao/show-dao");
const Error = require("./../../api/errors/movie-error").Delete;
const Movie = require("./show");
class DeleteAbl extends Movie {
  constructor() {
    super();
    this.dao = DaoShow;
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
