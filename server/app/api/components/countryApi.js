const AppClient = require("./appClient");
require("dotenv").config();

const USE_CASES = {
  Countries: "countries",
};

class CountryApi extends AppClient {
  constructor(errors) {
    super(process.env.COUNTRY_API_URI, process.env.COUNTRY_API_KEY);
    this.errors = errors;
  }
  async getCountryByCode({ country, state }) {
    try {
      return await super.get(`countries/${country}/states/${state}/cities`);
    } catch (e) {
      throw new this.errors.CannotGetCountry(e);
    }
  }
  async getStateByCode(data) {
    try {
      return await super.get(data, USE_CASES.Countries);
    } catch (e) {
      throw new this.errors.CannotGetCountry(e);
    }
  }
}

module.exports = CountryApi;
