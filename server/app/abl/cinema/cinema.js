const {
  requireDao,
  requireAllErrors,
} = require("./../../helpers/require-helpers");
const Context = require("./../../api/components/context");
const { STATES } = require("./constants");
class Cinema extends Context {
  constructor(errors) {
    super();
    this.dao = requireDao();
    this.errors = errors;
  }
  async getCinema(id) {
    const cinema = await this.dao.get(id);
    if (!cinema) {
      throw new this.errors.CinemaIsNotExist();
    }
  }
}

module.exports = Cinema;
