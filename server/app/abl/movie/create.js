const DaoMovie = require("../../dao/movie-dao");
const Error = require("./../../api/errors/movie-error").Create;
class CreateAbl {
  constructor() {
    this.dao = DaoMovie;
  }
  async create(dtoIn) {
    let dtoOut;
    dtoIn.state = "active";
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      console.log("e", e);
      if (e.name === "SequelizeUniqueConstraintError") {
        throw new Error.CinemaNameAlreadyExist();
      }
      throw new Error.CannotCreate(e);
    }
    return dtoOut;
  }
}
module.exports = new CreateAbl();
