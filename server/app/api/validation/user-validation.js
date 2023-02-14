const { body } = require("express-validator");
const registrationValidation = () => {
  return [
    body("username")
      .isLength({ min: 5 })
      .withMessage("Need at least 5 characters"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Need at least 5 characters"),
    body("email").isEmail(),
  ];
};
const loginValidation = () => {
  return [
    body("email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Need at least 5 characters"),
  ];
};
const deleteValidation = () => {
  return [body("id").isMongoId()];
};
const getValidation = () => {
  return [body("id").isMongoId()];
};
const updateValidation = () => {
  return [
    body("id").isMongoId(),
    body("email").isEmail(),
    body("fullName")
      .isLength({ min: 5 })
      .withMessage("Need at least 5 characters")
      .optional(),
    body("roles").isArray().isIn(["Admin", "Editor", "User"]).optional(),
  ];
};
module.exports = {
  registrationValidation,
  loginValidation,
  deleteValidation,
  getValidation,
  updateValidation,
};
