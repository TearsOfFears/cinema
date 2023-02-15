const { body } = require("express-validator");
const createValidation = () => [
  body("name").exists(),
  body("description")
    .isLength({ min: 5 })
    .withMessage("Need at least 5 characters"),
  body("state").isString(),
];
const deleteValidation = () => [body("id").isMongoId()];
const getValidation = () => [body("id").isMongoId()];
const listValidation = () => [
  body("sort").exists().isString(),
  body("key").exists().isString(),
  body("pageInfo").exists().isObject(),
  body("pageInfo.pageSize").exists().isNumeric(),
  body("pageInfo.pageIndex").exists().isNumeric(),
];
const updateValidation = () => [
  body("id").isMongoId(),
  body("email").isEmail(),
  body("fullName")
    .isLength({ min: 5 })
    .withMessage("Need at least 5 characters")
    .optional(),
  body("roles").isArray().isIn(["Admin", "Editor", "User"]).optional(),
];
module.exports = {
  createValidation,
  deleteValidation,
  getValidation,
  updateValidation,
  listValidation,
};
