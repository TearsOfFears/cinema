const Router = require("express").Router;
const CityController = require("../controllers/city-controller");
const response = require("./../middlewares/responseMiddle");
const validate = require("./../middlewares/validate");
const {
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
  response(async (dtoIn) => CityController.create(dtoIn))
);
router.get(
  "/list",
  listValidation(),
  auth("Standard"),
  response(async (dtoIn) => CityController.list(dtoIn))
);
router.get(
  "/get",
  getValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => CityController.get(dtoIn))
);
router.patch(
  "/update",
  updateValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => CityController.update(dtoIn))
);
router.patch(
  "/setState",
  updateValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => CityController.setState(dtoIn))
);
router.delete(
  "/delete",
  deleteValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => CityController.delete(dtoIn))
);

module.exports = router;
