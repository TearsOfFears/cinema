const Router = require("express").Router;
const UserController = require("../controllers/users-controller");
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
  "/registration",
  registrationValidation(),
  validate,
  response(async (dtoIn) => UserController.registration(dtoIn))
);
router.post(
  "/login",
  loginValidation(),
  validate,
  response(async (dtoIn) => UserController.login(dtoIn))
);
router.post(
  "/refresh",
  response(async (dtoIn) => UserController.refresh(dtoIn))
);
// router.get(
//   "/auth",
//   // auth.authenticate(),
//   response(async (dtoIn) => UserController.auth(dtoIn))
// );
router.get(
  "/list",
  listValidation(),
  auth("Standard"),
  response(async (dtoIn) => UserController.list(dtoIn))
);
router.get(
  "/get",
  getValidation(),
  validate,
  // auth("Standard"),
  response(async (dtoIn) => UserController.get(dtoIn))
);
router.patch(
  "/update",
  updateValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => UserController.update(dtoIn))
);
router.patch(
  "/setProfile",
  setProfilesValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => UserController.setProfile(dtoIn))
);
router.patch(
  "/setState",
  updateValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => UserController.setState(dtoIn))
);
router.delete(
  "/delete",
  deleteValidation(),
  validate,
  auth("Standard"),
  response(async (dtoIn) => UserController.delete(dtoIn))
);

module.exports = router;
