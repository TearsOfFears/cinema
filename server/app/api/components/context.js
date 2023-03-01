class Context {
  constructor() {}
  createObject(object, data) {
    return new object(data);
  }
}

module.exports = Context;
