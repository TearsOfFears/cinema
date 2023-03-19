const { Create } = require("./../../api/errors/cinema-hall-error");
const Booking = require("./booking");
const { STATES, ERRORS_CODES } = require("./../constants");
class CreateAbl extends Booking {
  constructor() {
    super();
  }
  async create(dtoIn) {
    let dtoOut;
    dtoIn.state = STATES.PASSIVE;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e.name === ERRORS_CODES.DUPLICATE) {
        throw new Create.CinemaHallAlreadyExist();
      }
      throw new Create.CannotCreate(e);
    }
    return dtoOut;
  }
}
module.exports = new CreateAbl();
