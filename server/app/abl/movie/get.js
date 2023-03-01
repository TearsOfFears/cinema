const DaoCinema = require("../../dao/movie-dao");
const Error = require("../../api/errors/movie-error").Get;
const Movie = require("./movie");
class GetAbl extends Movie {
  constructor() {
    super();
    this.dao = DaoCinema;
  }
  async get(dtoIn) {
    let cinema = super.getMovie(dtoIn, Error);
    return cinema;
  }
}
module.exports = new GetAbl();
