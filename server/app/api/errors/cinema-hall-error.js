const { AppError, HttpStatusCode } = require("./helpers/error");

const Create = {
  UC_CODE: `${AppError.getCode()}cinemaHall/Create/`,
  CinemaHallAlreadyExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}cinemaHallAlreadyExist`;
      this.message =
        "Cannot create cinema hall with this name. It`s already exists";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CinemaHallNotFound: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Create.UC_CODE}cinemaHallNotFound`;
      this.message = "CinemaHall with this credendial not found";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotCreate: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Create.UC_CODE}cannotCreate`;
      this.message = message || "Cannot create cinema hall";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const Delete = {
  UC_CODE: `${AppError.getCode()}cinemaHall/delete/`,
  CinemaHallIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}cinemaHallIsNotExist`;
      this.message = "cinemaHall not exist";
      this.statusCode = HttpStatusCode.NOT_FOUND;
    }
  },
  CinemaHallIsActiveState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}cinemaHallIsActiveState`;
      this.message = "Cannot delete cinemaHall in active state";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
  CannotDelete: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}cannotDelete`;
      this.message = "Cannot delete cinemaHall";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
};
const Get = {
  UC_CODE: `${AppError.getCode()}cinemaHall/get/`,
  CinemaHallIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}cinemaHallIsNotExist`;
      this.message = "cinemaHall not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CinemaHallIsNotActiveState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}cinemaHallIsNotActiveState`;
      this.message = "cinemaHall is not in active state";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const List = {
  UC_CODE: `${AppError.getCode()}cinemaHall/list/`,

  CannotList: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${List.UC_CODE}cannotList`;
      this.message = message || "Something wrong database";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const Update = {
  UC_CODE: `${AppError.getCode()}cinemaHall/update/`,
  CinemaHallIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}cinemaHallIsNotExist`;
      this.message = "cinemaHall not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotUpdate: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}cannotUpdate`;
      this.message = "cinemaHall cannot update";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CinemaHallIsNotActiveState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}cinemaHallIsNotActiveState`;
      this.message = "cinemaHall is not in active state";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const SetProfile = {
  UC_CODE: `${AppError.getCode()}cinemaHall/setProfile/`,
  cinemaHallIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${SetProfile.UC_CODE}cinemaHallIsNotExist`;
      this.message = "cinemaHall not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotUpdate: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${SetProfile.UC_CODE}cannotUpdate`;
      this.message = "cinemaHall cannot update";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  OneOfTheProfilesDoesNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${SetProfile.UC_CODE}oneOfTheProfilesDoesNotExist`;
      this.message = "One of the inserted profiles does not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CinemaHallIsNotActiveState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${SetProfile.UC_CODE}cinemaHallIsNotActiveState`;
      this.message = "cinemaHall is not in active state";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const SetState = {
  UC_CODE: `${AppError.getCode()}cinemaHall/setState/`,
  cinemaHallIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}cinemaHallIsNotExist`;
      this.message = "cinemaHall not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotUpdate: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}cannotUpdate`;
      this.message = "cinemaHall cannot update";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  cinemaHallIsAlreadyInActiveState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}cinemaHallIsAlreadyInActiveState`;
      this.message = "cinemaHall is already in active state";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
module.exports = {
  Create,
  Delete,
  List,
  Get,
  Update,
  SetState,
};
