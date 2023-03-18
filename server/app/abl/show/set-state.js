const DaoShow = require("../../dao/show-dao");
const Error = require("./../../api/errors/movie-error").SetState;
const Show = require("./show");
class SetStateAbl extends Show {
  constructor() {
    super();
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
