const DaoShow = require("../../dao/show-dao");
const Error = require("../../api/errors/movie-error").Get;
const Show = require("./show");
class GetAbl extends Show {
  constructor() {
    super();
  }
  async get(dtoIn) {
    let cinema = super.getMovie(dtoIn, Error);
    return cinema;
  }
}
module.exports = new GetAbl();
