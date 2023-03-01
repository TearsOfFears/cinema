const AppClient = require("./appClient");
require("dotenv").config();

const USE_CASES = {
  getGenres: "title/get-genres",
};

class ImdbApi extends AppClient {
  constructor(errors) {
    super(
      process.env.IMDB_API_URI,
      process.env.IMDB_API_KEY,
      process.env.X_RAPIDAPI_KEY
    );
    this.errors = errors;
  }
  async getGenres({ movieId }) {
    try {
      let params = { tconst: movieId };
      return await super.get(USE_CASES.getGenres, params);
    } catch (e) {
      throw new this.errors.CountryNotFound(e);
    }
  }
}

module.exports = ImdbApi;
