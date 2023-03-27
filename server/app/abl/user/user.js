const { Schemas } = require("./../constants");
const { requireDao } = require("./../../helpers/require-helpers");
class User {
  constructor(ctx) {
    this.ctx = ctx;
    this.errors = ctx.errors;
    this.dao = ctx.dao;
    this.dtoIn = ctx.dtoIn;
    this.daoProfiles = requireDao(Schemas.PROFILES);
  }
}

module.exports = User;
