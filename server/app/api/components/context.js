const {
  requireUseCaseError,
  requireDao,
} = require("./../../helpers/require-helpers");

class Context {
  constructor({ req, res }) {
    const originalUrl = req.originalUrl.split("/");
    this.entity = originalUrl[originalUrl.length - 2];
    this.useCase = originalUrl[originalUrl.length - 1];
    this.dtoInData = req.user ? req.user : req.body;
  }
  get dtoIn() {
    return this.dtoInData;
  }
  get errors() {
    return requireUseCaseError(this.entity, this.useCase);
  }
  get dao() {
    return requireDao(this.entity);
  }
  getDao(dao) {
    return requireDao(dao);
  }
  get fullContext() {
    return {
      dao: this.dao,
      errors: this.errors,
      dtoIn: this.dtoIn,
      getDao: this.getDao,
    };
  }
  createObject(object, data) {
    return new object(data);
  }
  createUseCaseInstance(object) {
    return this.createObject(object, this.fullContext);
  }
}

module.exports = Context;
