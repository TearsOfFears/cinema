const { STATES } = require("./constants");
const { Schemas } = require("./../constants");
class Cinema {
  constructor(ctx) {
    this.errors = ctx.errors;
    this.dao = ctx.dao;
    // this.daoCheck = ctx.getSpecificDao(Schemas.SHOW);
  }
  async getCinema(id) {
    const cinema = await this.dao.get(id);
    if (!cinema) {
      throw new this.errors.CinemaIsNotExist();
    }
    return cinema;
  }
  async getCinemaAndActiveState(id) {
    const cinema = this.getCinema(id);
    if (cinema.state === STATES.ACTIVE) {
      throw new this.errors.CinemaIsInActiveState();
    }
    return cinema;
  }
}

module.exports = Cinema;
