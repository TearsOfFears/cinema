const { requireDao } = require("./../../helpers/require-helpers");
const Context = require("./../../api/components/context");
const { STATES } = require("./constants");
class Cinema extends Context {
  constructor(entity, useCase) {
    super();
    this.dao = requireDao(entity);
    this.errors = require("../../helpers/require-helpers").requireUseCaseError(
      entity,
      useCase
    );
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
