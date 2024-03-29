const DaoMovie = require("../../dao/movie-dao");
const { STATES } = require("../constants");
const Error = require("../../api/errors/movie-error").List;

class ListAbl {
  constructor() {
    this.dao = DaoMovie;
  }
  async list(dtoIn) {
    dtoIn.pageInfo ||= {};
    dtoIn.pageInfo.pageSize ||= 10;
    dtoIn.pageInfo.pageIndex ||= 0;
    dtoIn.state ||= STATES.PASSIVE;
    let movies;
    try {
      movies = await this.dao.list(dtoIn);
    } catch (e) {
      throw new Error.CannotGetList(e);
    }

    return movies;
  }
}
module.exports = new ListAbl();
