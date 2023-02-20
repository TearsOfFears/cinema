const Router = require("express").Router;
const CinemaController = require("../controllers/cinema-controller");
const response = require("./../middlewares/responseMiddle");
const validate = require("./../middlewares/validate");
const {
  registrationValidation,
  loginValidation,
  deleteValidation,
  getValidation,
  updateValidation,
  listValidation,
  setProfilesValidation,
} = require("../validation/user-validation");
const auth = require("../middlewares/auth");

const router = new Router();

router.post(
  "/create",
  // registrationValidation(),
  // validate,
  response(async (dtoIn) => CinemaController.create(dtoIn))
);
router.get(
  "/list",
  // listValidation(),
  auth("Standard"),
  response(async (dtoIn) => CinemaController.list(dtoIn))
);
router.get(
  "/get",
  getValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => CinemaController.get(dtoIn))
);
router.delete(
  "/delete",
  deleteValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => UserController.delete(dtoIn))
);

module.exports = router;
