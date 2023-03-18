const DaoShow = require("./../../dao/show-dao");
const Context = require("./../../api/components/context");
const { STATES } = require("./constants");
class Show extends Context {
  constructor() {
    super();
    this.dao = DaoShow;
  }
  async checkMovieExistAndState(dtoIn, Errors) {
    const movie = await this.getMovie(dtoIn, Errors);
    if (movie.state === STATES.ACTIVE) {
      throw new Errors.MovieIsInActiveState();
    }
  }
}

module.exports = Show;
