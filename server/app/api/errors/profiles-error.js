// eslint-disable-next-line max-classes-per-file
const { AppError, HttpStatusCode } = require("./helpers/error");

const Registration = {
  UC_CODE: `${AppError.getCode()}profiles/registration/`,
  CannotRegistration: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Registration.UC_CODE}cannotRegistration`;
      this.message = "Cannot Registration";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  RegistrationFailed: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Registration.UC_CODE}registrationFailed`;
      this.message = "Something wrong with database create object";
      this.statusCode = HttpStatusCode.BAD_REQUEST;
    }
  },
  UserIsExist: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Registration.UC_CODE}userIsExist`;
      this.message = "User with with this credentials already exist";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const Login = {
  UC_CODE: `${AppError.getCode()}user/login/`,
  CannotLogin: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Registration.UC_CODE}cannotLogin`;
      this.message = message || "Cannot Login";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  PasswordIsNotCorrect: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Login.UC_CODE}passwordIsNotCorrect`;
      this.message = "Authentication failed. Wrong password";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  UserNotFound: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Login.UC_CODE}userNotFound`;
      this.message = "User with this credendtial not found";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
const Auth = {
  UC_CODE: `${AppError.getCode()}profiles/auth/`,
  CannotGetUser: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Registration.UC_CODE}CannotGetUser`;
      this.message = "User not found";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  PasswordIsNotCorrect: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Login.UC_CODE}passwordIsNotCorrect`;
      this.message = "Authentication failed. Wrong password";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
  UserNotFound: class extends AppError {
    constructor(message) {
      super(...arguments);
      this.code = `${Login.UC_CODE}userNotFound`;
      this.message = "User with this credendtial not found";
      this.statusCode = HttpStatusCode.CANNOT_GET;
    }
  },
};
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
  UC_CODE: `${AppError.getCode()}profiles/create/`,

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
  Registration,
  Login,
  Delete,
  Get,
  Auth,
  Update,
  Create,
};
