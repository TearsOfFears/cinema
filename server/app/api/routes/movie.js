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
  updateValidation,
} = require("../validation/movie-validation");
const auth = require("../middlewares/auth");
const UserController = require("../controllers/users-controller");

const router = new Router();

router.post(
  "/create",
  createValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => MovieController.create(dtoIn))
);
router.get(
  "/list",
  listValidation(),
  auth("Standard"),
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
