const {AppError, HttpStatusCode} = require("./helpers/error");

const Registration = {
    UC_CODE: `${AppError.getCode()}user/registration/`,
    CannotRegistration: class extends AppError {
        constructor(message) {
            super(...arguments);
            this.code = `${Registration.UC_CODE}cannotRegistration`;
            this.message = "Cannot Registration";
            this.statusCode = HttpStatusCode.CANNOT_GET;
        }
    },
    UserIsExist: class extends AppError {
        constructor(message) {
            super(...arguments);
            this.code = `${Registration.UC_CODE}userIsExist`;
            this.message = message ||"User with this Email is exist";
            this.statusCode = HttpStatusCode.CANNOT_GET;
        }
    },
}
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
}
const Delete = {
    UC_CODE: `${AppError.getCode()}user/delete/`,
    UserIsNotExist: class extends AppError {
        constructor() {
            super(...arguments);
            this.code = `${Delete.UC_CODE}userIsNotExist`;
            this.message = "User not exist";
            this.statusCode = HttpStatusCode.NOT_FOUND;
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
}
const Get = {
    UC_CODE: `${AppError.getCode()}user/get/`,
    UserIsNotExist: class extends AppError {
        constructor() {
            super(...arguments);
            this.code = `${Get.UC_CODE}userIsNotExist`;
            this.message = "User not exist";
            this.statusCode = HttpStatusCode.CANNOT_GET;
        }
    },
}
const Update = {
    UC_CODE: `${AppError.getCode()}user/update/`,
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
}
module.exports = {
    Registration,
    Login,
    Delete,
    Get,
    Update,

}
