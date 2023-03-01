const AppClient = require("./appClient");
require("dotenv").config();

class CountryApi extends AppClient {
  constructor(errors) {
    super(
      process.env.COUNTRY_API_URI,
      process.env.COUNTRY_API_KEY,
      process.env.X_CSCAPI_KEY
    );
    this.errors = errors;
  }
  async getCityByCode({ country, state }) {
    try {
      return await super.get(`countries/${country}/states/${state}/cities`);
    } catch (e) {
      throw new this.errors.CannotGetCountry(e);
    }
  }
  async getCountryByCode({ country }) {
    try {
      return await super.get(`countries/${country}`);
    } catch (e) {
      throw new this.errors.CountryNotFound(e);
    }
  }
}

module.exports = CountryApi;
