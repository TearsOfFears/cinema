// eslint-disable-next-line max-classes-per-file
const { AppError, HttpStatusCode } = require("./helpers/error");
const Delete = {
  UC_CODE: `${AppError.getCode()}profiles/delete/`,
  UserIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}userIsNotExist`;
      this.message = "User not exist";
      this.statusCode = HttpStatusCode.NOT_FOUND;
    }
  },
  UserIsActiveState: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}UserIsActiveState`;
      this.message = "Cannot delete user in active state";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
  CannotDelete: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}cannotDelete`;
      this.message = "Cannot delete user";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
};
const Get = {
  UC_CODE: `${AppError.getCode()}profiles/get/`,
  ProfileIsNotExist: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}profileIsNotExist`;
      this.message = "Profile not exist";
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
  UC_CODE: `${AppError.getCode()}city/create/`,

  CannotUpdate: class extends AppError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}cannotUpdate`;
      this.message = "User cannot create";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  CannotCreate: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Create.UC_CODE}cannotCreate`;
      this.message = message || "Cannot create user something wrong with db";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
module.exports = {
  Create,
  Delete,
  Get,
  Update,
};
