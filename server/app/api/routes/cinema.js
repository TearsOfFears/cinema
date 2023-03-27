const Router = require("express").Router;
const CinemaController = require("../controllers/cinema-controller");
const response = require("./../middlewares/responseMiddle");
const validate = require("./../middlewares/validate");
const {
  createValidation,
  deleteValidation,
  getValidation,
  updateValidation,
  listValidation,
} = require("../validation/cinema-validation");
const auth = require("../middlewares/auth");

const router = new Router();

router.post(
  "/create",
  createValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => CinemaController.create(dtoIn))
);
router.post(
  "/setState",
  // createValidation(),
  // validate,
  auth(["Standard"]),
  response(async (dtoIn) => CinemaController.setState(dtoIn))
);
router.get(
  "/list",
  listValidation(),
  auth(["Standard"]),
  response(async (dtoIn) => CinemaController.list(dtoIn))
);
router.get(
  "/get",
  getValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => CinemaController.get(dtoIn))
);
router.delete(
  "/delete",
  deleteValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => CinemaController.delete(dtoIn))
);

module.exports = router;
