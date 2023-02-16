const { body } = require("express-validator");
const createValidation = () => [
  body("name").exists(),
  body("description")
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
  body("name").exists(),
  body("description")
    .isLength({ min: 5 })
    .withMessage("Need at least 5 characters"),
];
module.exports = {
  createValidation,
  deleteValidation,
  getValidation,
  updateValidation,
  listValidation,
};
