const { requireDao } = require("../../helpers/require-helpers");

class Context {
  constructor() {}
  createObject(object, data) {
    return new object(data);
  }
}

module.exports = Context;
