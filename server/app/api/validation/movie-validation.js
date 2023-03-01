const { body } = require("express-validator");

const createValidation = () => [
  body("title").exists(),
  body("description").exists().isString(),
  body("duration").exists(),
  body("language.*").isString(),
  body("releaseDate").exists().isDate({ format: "YYYY-MM-DD" }),
  body("country.*").isString(),
  body("genre").isArray(),
  body("genre.*").isString(),
  body("state").isString(),
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
  body("title").exists(),
  body("description").exists().isString(),
  body("duration").exists(),
  body("language.*").isString(),
  body("releaseDate").exists().isDate({ format: "YYYY-MM-DD" }),
  body("country.*").isString(),
  body("genre").isArray(),
  body("genre.*").isString(),
];
const setStateValidation = () => [
  body("id").isUUID(4),
  body("state").exists().isIn(["active", "passive", "closed"]),
];
module.exports = {
  createValidation,
  deleteValidation,
  getValidation,
  updateValidation,
  listValidation,
  setStateValidation,
};
