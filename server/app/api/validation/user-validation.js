const { body } = require("express-validator");
const registrationValidation = () => [
  body("username")
    .isLength({ min: 5 })
    .withMessage("Need at least 5 characters"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Need at least 5 characters"),
  body("phone")
    .isLength({ min: 5 })
    .withMessage("Need at least 5 characters")
    .optional(),
  body("email").isEmail(),
];
const loginValidation = () => [
  body("email").isEmail(),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Need at least 5 characters"),
];
const deleteValidation = () => [body("id").isUUID(4)];
const getValidation = () => [body("id").isUUID(4)];
const listValidation = () => [
  body("sort").exists().isString(),
  body("key").exists().isString(),
  body("pageInfo").exists().isObject(),
  body("pageInfo.pageSize").exists().isNumeric(),
  body("pageInfo.pageIndex").exists().isNumeric(),
];
const updateValidation = () => [
  body("id").isUUID(4),
  body("username")
    .isLength({ min: 5 })
    .withMessage("Need at least 5 characters")
    .optional(),
];
const setProfilesValidation = () => [
  body("id").isUUID(4),
  body("profilesArrayId.*")
    .isUUID(4)
    .withMessage("Need correct id of profiles")
    .optional(),
];
module.exports = {
  registrationValidation,
  loginValidation,
  deleteValidation,
  getValidation,
  updateValidation,
  setProfilesValidation,
  listValidation,
};
