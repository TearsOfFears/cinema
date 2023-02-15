const Model = require("../models/user-schema.js");
const { STATES } = require("../abl/user/constants");

class DaoUsers {
  constructor() {
    this.dao = Model;
  }
  async create(object) {
    const doc = await this.dao.create(object);
    const { passwordHash, ...dtoOut } = doc.dataValues;
    return dtoOut;
  }
  async list(dtoIn) {
    const objects = await this.dao
      .find({ state: STATES.ACTIVE })
      .sort([[dtoIn.sort, dtoIn.key]])
      .limit(dtoIn.pageInfo.pageSize)
      .skip(dtoIn.pageInfo.pageSize * dtoIn.pageInfo.pageIndex);
    return {
      items: objects,
      pageInfo: {
        pageSize: dtoIn.pageInfo.pageSize,
        pageIndex: dtoIn.pageInfo.pageIndex,
      },
    };
  }
  async delete(id) {
    return await this.dao.findByIdAndDelete(id);
  }
  async get(id) {
    const doc = await this.dao.findById(id);
    if (!doc) return null;
    const { passwordHash, ...dtoOut } = doc?._doc;
    return dtoOut;
  }
  async getByEmail(object) {
    const doc = await this.dao.findOne(object);
    return doc?._doc;
  }
  async update(dtoIn) {
    const doc = await this.dao.findByIdAndUpdate(dtoIn.id, dtoIn, {
      returnDocument: "after",
    });
    const { passwordHash, ...dtoOut } = doc._doc;
    return dtoOut;
  }
}

module.exports = new DaoUsers();
