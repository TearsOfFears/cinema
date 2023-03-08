const Router = require("express").Router;
const MovieController = require("../controllers/movie-controller");
const response = require("./../middlewares/responseMiddle");
const validate = require("./../middlewares/validate");
const {
  createValidation,
  deleteValidation,
  getValidation,
  listValidation,
  setStateValidation,
  createByImdbValidation,
  updateValidation,
} = require("../validation/movie-validation");
const auth = require("../middlewares/auth");

const router = new Router();

router.post(
  "/createByManual",
  createValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => MovieController.createByManual(dtoIn))
);
router.post(
  "/createByImdb",
  createByImdbValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => MovieController.createByImdb(dtoIn))
);
router.get(
  "/list",
  listValidation(),
  auth(["Standard"]),
  response(async (dtoIn) => MovieController.list(dtoIn))
);
router.get(
  "/get",
  getValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => MovieController.get(dtoIn))
);
router.delete(
  "/delete",
  deleteValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => MovieController.delete(dtoIn))
);
router.patch(
  "/setState",
  setStateValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => MovieController.setState(dtoIn))
);
router.patch(
  "/setState",
  updateValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => MovieController.update(dtoIn))
);
module.exports = router;
