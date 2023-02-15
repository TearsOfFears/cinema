const Router = require("express").Router;
const ProfilesController = require("../controllers/profiles-controller");
const response = require("./../middlewares/responseMiddle");
const validate = require("./../middlewares/validate");
const {
  createValidation,
  deleteValidation,
  getValidation,
  updateValidation,
  listValidation,
} = require("../validation/profiles-validation");
const auth = require("../middlewares/auth");

const router = new Router();

router.post(
  "/create",
  createValidation(),
  validate,
  response(async (dtoIn) => ProfilesController.create(dtoIn))
);
router.get(
  "/list",
  listValidation(),
  auth,
  response(async (dtoIn) => ProfilesController.list(dtoIn))
);
router.get(
  "/get",
  getValidation(),
  validate,
  response(async (dtoIn) => ProfilesController.get(dtoIn))
);
router.patch(
  "/update",
  updateValidation(),
  validate,
  // auth.authenticate(),
  response(async (dtoIn) => ProfilesController.update(dtoIn))
);
router.delete(
  "/delete",
  deleteValidation(),
  validate,
  auth,
  response(async (dtoIn) => ProfilesController.delete(dtoIn))
);

module.exports = router;
