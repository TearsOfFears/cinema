const DaoBooking = require("./../../dao/booking-dao");
const Context = require("./../../api/components/context");
const { STATES } = require("./../constants");
class Booking {
  constructor() {
    // super();
    this.dao = DaoBooking;
  }
  async checkMovieExistAndState(dtoIn, Errors) {
    const movie = await this.getMovie(dtoIn, Errors);
    if (movie.state === STATES.ACTIVE) {
      throw new Errors.MovieIsInActiveState();
    }
  }
}

module.exports = Booking;
