const { Schemas } = require("./../constants");

class User {
  constructor(ctx) {
    this.errors = ctx.errors;
    this.dao = ctx.dao;
    this.daoProfiles = ctx.getSpecificDao(Schemas.PROFILES);
  }
}

module.exports = User;
