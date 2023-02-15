class AppError extends Error {
  static getCode() {
    return "cinema/";
  }
  constructor(errorCode, message, code) {
    super(message);
    this.message = message;
    this.statusCode = errorCode;
    this.code = code;
  }
}

const handleError = (error, req, res, next) => {
  if (error.name === "ValidationError") {
    return res.status(400).send({
      type: "ValidationError",
      details: error.details,
    });
  }
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(error);
  } else {
    return res.status(error.statusCode).json({
      errorCode: error.statusCode,
      message: error.message,
      code: error.code,
    });
  }
  return res
    .status(HttpStatusCode.INTERNAL_SERVER)
    .send("Something went wrong");
};
const HttpStatusCode = {
  OK: 200,
  BAD_REQUEST: 400,
  CANNOT_GET: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

module.exports = {
  HttpStatusCode,
  AppError,
  handleError,
};
