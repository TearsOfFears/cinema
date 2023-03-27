const { AppError, HttpStatusCode } = require("./helpers/error");

const Delete = {
  UC_CODE: `${AppError.getCode()}cinema/delete/`,
  CinemaIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}cinemaIsNotExist`;
      this.message = "Cinema is not exist";
      this.statusCode = HttpStatusCode.NOT_FOUND;
    }
  },
  CinemaIsInActiveState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}cinemaIsInActiveState`;
      this.message = "Cannot delete cinema in active state";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
  CannotDelete: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Delete.UC_CODE}cannotDelete`;
      this.message = message || "Cannot delete cinema";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
};
const Get = {
  UC_CODE: `${AppError.getCode()}cinema/get/`,
  CinemaIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}cinematIsNotExist`;
      this.message = "Cinema not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const List = {
  UC_CODE: `${AppError.getCode()}cinema/list/`,
  CannotList: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${List.UC_CODE}cannotList`;
      this.message = message || "Something wrong with database";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const Update = {
  UC_CODE: `${AppError.getCode()}profiles/update/`,
  UserIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userIsNotExist`;
      this.message = "User not exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotUpdate: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}cannotUpdate`;
      this.message = "User cannot update";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  UserIsNotActiveState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}userIsNotActiveState`;
      this.message = "User is not in active state";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const Create = {
  UC_CODE: `${AppError.getCode()}cinema/create/`,
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
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}cannotGetCountry`;
      this.message = "Cannot create cinema something wrong with country api";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CityNotFound: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}cityNotFound`;
      this.message = "City with this name in this country or state not found";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CinemaNameAlreadyExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}cinemaNameAlreadyExist`;
      this.message = "Cinema with this name already exist";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
};
const SetState = {
  UC_CODE: `${AppError.getCode()}cinema/setState/`,
  CinemaIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}cinemaIsNotExist`;
      this.message = "Cinema is not exist";
      this.statusCode = HttpStatusCode.NOT_FOUND;
    }
  },
  CannotSetState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${SetState.UC_CODE}cannotSetState`;
      this.message = "Cannot set state for cinema something wrong wit database";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
};
module.exports = {
  Delete,
  SetState,
  Get,
  Update,
  Create,
  List,
};
