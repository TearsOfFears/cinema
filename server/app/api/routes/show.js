const Router = require("express").Router;
const ShowController = require("../controllers/show-controller");
const response = require("./../middlewares/responseMiddle");
const validate = require("./../middlewares/validate");
const {
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
  response(async (dtoIn) => ShowController.create(dtoIn))
);
// router.get(
//   "/auth",
//   // auth.authenticate(),
//   response(async (dtoIn) => UserController.auth(dtoIn))
// );
router.get(
  "/list",
  listValidation(),
  auth(["Standard"]),
  response(async (dtoIn) => ShowController.list(dtoIn))
);
router.get(
  "/get",
  getValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => ShowController.get(dtoIn))
);
router.patch(
  "/update",
  updateValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => ShowController.update(dtoIn))
);
router.patch(
  "/setProfile",
  setProfilesValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => ShowController.setProfile(dtoIn))
);
router.patch(
  "/setState",
  updateValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => ShowController.setState(dtoIn))
);
router.delete(
  "/delete",
  deleteValidation(),
  validate,
  auth(["Standard"]),
  response(async (dtoIn) => ShowController.delete(dtoIn))
);

module.exports = router;
