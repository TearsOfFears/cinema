const DaoMovie = require("../../dao/movie-dao");
const { Create, CreateByImdb } = require("./../../api/errors/movie-error");
const Movie = require("./movie");
const { STATES, ERRORS_CODES } = require("./constants");
const ImdbApi = require("./../../api/components/imdbApi");
class CreateAbl extends Movie {
  constructor() {
    super();
    this.dao = DaoMovie;
  }
  async createByManual(dtoIn) {
    let dtoOut;
    dtoIn.state = STATES.PASSIVE;
    await super.getCountry(dtoIn, Create);
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e.name === ERRORS_CODES.DUPLICATE) {
        throw new Create.MovieNameAlreadyExist();
      }
      throw new Create.CannotCreate(e);
    }
    return dtoOut;
  }
  async createByImdb(dtoIn) {
    let dtoOut;
    dtoIn.state = STATES.PASSIVE;
    const {
      title,
      runningTimeInMinutes,
      image,
      year,
      genre,
      description,
      origins,
      spokenLanguages,
    } = await this.getFullDataMovie(dtoIn, CreateByImdb);
    dtoIn.title = title;
    dtoIn.duration = runningTimeInMinutes;
    dtoIn.year = year;
    dtoIn.genre = genre;
    dtoIn.poster = image;
    dtoIn.language = spokenLanguages;
    dtoIn.country = origins;
    dtoIn.plotShort = description.plots[0].text;
    dtoIn.plotLong = description.plots[1].text;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e.name === ERRORS_CODES.DUPLICATE) {
        throw new CreateByImdb.MovieNameAlreadyExist();
      }
      throw new CreateByImdb.CannotCreate(e);
    }
    return dtoOut;
  }
  async getFullDataMovie(dtoIn, Errors) {
    const year = await this.getReleaseDate(dtoIn, Errors);
    const description = await this.getPlots(dtoIn, Errors);
    const genre = await this.getMovieGenres(dtoIn, Errors);
    const { title, runningTimeInMinutes, image } = await this.getMovieDetails(
      dtoIn,
      Errors
    );
    const { origins, spokenLanguages } = await this.getLanguageAndCountry(
      dtoIn,
      Errors
    );
    return {
      title,
      runningTimeInMinutes,
      image: image.url,
      year,
      genre,
      origins,
      spokenLanguages,
      description,
    };
  }
  async getMovieGenres(dtoIn, Errors) {
    const imdbInstance = super.createObject(ImdbApi, Errors);
    return await imdbInstance.getGenres({ link: dtoIn.imdbLink });
  }
  async getMovieDetails(dtoIn, Errors) {
    const imdbInstance = super.createObject(ImdbApi, Errors);
    return await imdbInstance.getDetails({ link: dtoIn.imdbLink });
  }
  async getLanguageAndCountry(dtoIn, Errors) {
    const imdbInstance = super.createObject(ImdbApi, Errors);
    return await imdbInstance.getLanguageAndCountry({ link: dtoIn.imdbLink });
  }
  async getReleaseDate(dtoIn, Errors) {
    const imdbInstance = super.createObject(ImdbApi, Errors);
    const data = await imdbInstance.getReleasedDate({ link: dtoIn.imdbLink });
    return data.map((el) => el.date)[data.length - 1];
  }
  async getPlots(dtoIn, Errors) {
    const imdbInstance = super.createObject(ImdbApi, Errors);
    return await imdbInstance.getPlot({ link: dtoIn.imdbLink });
  }
}
module.exports = new CreateAbl();
