const { body } = require("express-validator");

const createValidation = () => [
  body("title").exists(),
  body("plotShort").isString().exists(),
  body("plotLong").isString().exists(),
  body("duration").isNumeric().isLength(3).exists(),
  body("language.*").isString(),
  body("year").exists().isDate(),
  body("country.*").isString(),
  body("genre").isArray(),
  body("genre.*").isString(),
  body("state").isString(),
];
const createByImdbValidation = () => [body("imdbLink").isURL().exists()];
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
  body("plotShort").isString().exists(),
  body("plotLong").isString().exists(),
  body("duration").isNumeric().isLength(3).exists(),
  body("language.*").isString(),
  body("releaseDate").exists().isDate({ format: "YYYY" }),
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
  createByImdbValidation,
  deleteValidation,
  getValidation,
  updateValidation,
  listValidation,
  setStateValidation,
};
