// eslint-disable-next-line max-classes-per-file
const { AppError, HttpStatusCode } = require("./helpers/error");

const Delete = {
  UC_CODE: `${AppError.getCode()}movie/delete/`,
  MovieIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}movieIsNotExist`;
      this.message = "Movie is not exist";
      this.statusCode = HttpStatusCode.NOT_FOUND;
    }
  },
  MovieIsInActiveState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}MovieIsInActiveState`;
      this.message = "Cannot delete movie in active state";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
  CannotDelete: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Delete.UC_CODE}cannotDelete`;
      this.message = message || "Cannot delete user";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
};
const Get = {
  UC_CODE: `${AppError.getCode()}movie/get/`,
  MovieDoesNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}movieDoesNotExist`;
      this.message = "Movie does not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  MovieIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}movieIsNotExist`;
      this.message = "Movie does not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const List = {
  UC_CODE: `${AppError.getCode()}movie/list/`,
  CannotGetList: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${List.UC_CODE}cannotGetList`;
      this.message = message || "Cannot get list of movies";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const Update = {
  UC_CODE: `${AppError.getCode()}movie/update/`,
  UserIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}movieIsNotExist`;
      this.message = "User not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotUpdate: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}cannotUpdate`;
      this.message = "Movie cannot update";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  UserIsNotActiveState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userIsNotActiveState`;
      this.message = "Movie is not in active state";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const SetState = {
  UC_CODE: `${AppError.getCode()}movie/setState/`,
  MovieIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}userIsNotExist`;
      this.message = "Movie not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotUpdate: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${SetState.UC_CODE}cannotUpdate`;
      this.message = message || "Movie cannot update";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  MovieIsInActiveState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}movieIsInActiveState`;
      this.message = "Movie is in active state";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};

const Create = {
  UC_CODE: `${AppError.getCode()}movie/create/`,
  CannotUpdate: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}cannotCreate`;
      this.message = "User cannot create";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotCreate: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Create.UC_CODE}cannotCreate`;
      this.message = message || "Cannot create cinema something wrong with db";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotGetCountry: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Create.UC_CODE}cannotGetCountry`;
      this.message = message || "Cannot create movie check country code";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CountryNotFound: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Create.UC_CODE}countryNotFound`;
      this.message = message || "One of the Country with code does not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  MovieNameAlreadyExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}MovieNameAlreadyExist`;
      this.message = "Movie with this name already exist";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
};
const CreateByImdb = {
  UC_CODE: `${AppError.getCode()}movie/createByImdb/`,
  CannotUpdate: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${CreateByImdb.UC_CODE}cannotCreate`;
      this.message = "User cannot create";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotCreate: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${CreateByImdb.UC_CODE}cannotCreate`;
      this.message = message || "Cannot create cinema something wrong with db";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotGetCountry: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${CreateByImdb.UC_CODE}cannotGetCountry`;
      this.message = message || "Cannot create movie check country code";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CountryNotFound: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${CreateByImdb.UC_CODE}countryNotFound`;
      this.message = message || "One of the Country with code does not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  MovieNameAlreadyExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${CreateByImdb.UC_CODE}movieNameAlreadyExist`;
      this.message = "Movie with this name already exist";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
  SomethingWrongWithImdbApi: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${CreateByImdb.UC_CODE}somethingWrongWithImdbApi`;
      this.message = message || "Something wrong happened with IMDB API";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
};
module.exports = {
  Delete,
  Get,
  Update,
  Create,
  SetState,
  CreateByImdb,
  List,
};
