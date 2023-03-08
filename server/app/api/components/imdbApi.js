const AppClient = require("./appClient");
require("dotenv").config();

const USE_CASES = {
  getGenres: "title/get-genres",
  getRating: "title/get-ratings",
  getDetails: "title/get-details",
  getPlots: "title/get-plots",
  getReleased: "title/get-production-status",
  getLanguageAndCountry: "title/get-versions",
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
  _parseLink(link) {
    const url = new URL(link);
    return url.pathname
      .split("/")
      .filter((el) => (el.match(/^[t-t]{2}/) ? el : null))[0];
  }
  async getGenres({ link }) {
    try {
      const movieId = this._parseLink(link);
      let params = { tconst: movieId };
      return await super.get(USE_CASES.getGenres, params);
    } catch (e) {
      throw new this.errors.SomethingWrongWithImdbApi(e);
    }
  }
  async getDetails({ link }) {
    try {
      const movieId = this._parseLink(link);
      let params = { tconst: movieId };
      return await super.get(USE_CASES.getDetails, params);
    } catch (e) {
      throw new this.errors.SomethingWrongWithImdbApi(e);
    }
  }
  async getPlot({ link }) {
    try {
      const movieId = this._parseLink(link);
      let params = { tconst: movieId };
      return await super.get(USE_CASES.getPlots, params);
    } catch (e) {
      throw new this.errors.SomethingWrongWithImdbApi(e);
    }
  }
  async getReleasedDate({ link }) {
    try {
      const movieId = this._parseLink(link);
      let params = { tconst: movieId };
      return await super.get(USE_CASES.getReleased, params);
    } catch (e) {
      throw new this.errors.SomethingWrongWithImdbApi(e);
    }
  }
  async getLanguageAndCountry({ link }) {
    try {
      const movieId = this._parseLink(link);
      let params = { tconst: movieId };
      return await super.get(USE_CASES.getLanguageAndCountry, params);
    } catch (e) {
      throw new this.errors.SomethingWrongWithImdbApi(e);
    }
  }
}

module.exports = ImdbApi;
