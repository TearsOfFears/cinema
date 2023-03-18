const Router = require("express").Router;
const CinemaHallController = require("../controllers/cinema-hall-controller");
const response = require("./../middlewares/responseMiddle");
const validate = require("./../middlewares/validate");
const {
  registrationValidation,
  loginValidation,
  deleteValidation,
  getValidation,
  updateValidation,
  listValidation,
} = require("../validation/user-validation");
const auth = require("../middlewares/auth");

const router = new Router();

router.post(
  "/create",
  // registrationValidation(),
  // validate,
  response(async (dtoIn) => CinemaHallController.create(dtoIn))
);
router.get(
  "/list",
  listValidation(),
  auth(["Standard"]),
  response(async (dtoIn) => CinemaHallController.list(dtoIn))
);
router.get(
  "/get",
  getValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => CinemaHallController.get(dtoIn))
);
router.patch(
  "/update",
  updateValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => CinemaHallController.update(dtoIn))
);

router.patch(
  "/setState",
  updateValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => CinemaHallController.setState(dtoIn))
);
router.delete(
  "/delete",
  deleteValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => CinemaHallController.delete(dtoIn))
);

module.exports = router;
