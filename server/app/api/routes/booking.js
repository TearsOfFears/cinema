const Router = require("express").Router;
const BookingController = require("../controllers/booking-controller");
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
  // createValidation(),
  // validate,
  auth(["Standard"]),
  response(async (dtoIn) => BookingController.create(dtoIn))
);
router.get(
  "/list",
  listValidation(),
  auth(["Standard"]),
  response(async (dtoIn) => BookingController.list(dtoIn))
);
router.get(
  "/get",
  getValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => BookingController.get(dtoIn))
);
router.delete(
  "/delete",
  deleteValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => BookingController.delete(dtoIn))
);

module.exports = router;
