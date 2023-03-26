const DaoMovie = require("./../../dao/movie-dao");
const CountryApi = require("../../api/components/countryApi");
const Context = require("./../../api/components/context");
const { STATES } = require("./constants");
class Movie {
  constructor() {
    // super();
    // this.daoMovie = DaoMovie;
  }
  async getCountry(dtoIn, Errors) {
    const countryInstance = super.createObject(CountryApi, Errors);
    await Promise.all(
      dtoIn.country.map(
        async (el) =>
          await countryInstance.getCountryByCode({
            country: el,
          })
      )
    );
  }
  async getMovie(dtoIn, Errors) {
    const movie = await this.daoMovie.get(dtoIn.id);
    if (!movie) {
      throw new Errors.MovieIsNotExist();
    }
    return movie;
  }
  async checkMovieExistAndState(dtoIn, Errors) {
    const movie = await this.getMovie(dtoIn, Errors);
    if (movie.state === STATES.ACTIVE) {
      throw new Errors.MovieIsInActiveState();
    }
  }
}

module.exports = Movie;
