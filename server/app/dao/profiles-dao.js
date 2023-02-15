const Model = require("../models/profiles-schema");
const { STATES } = require("../abl/user/constants");

class DaoProfiles {
  constructor() {
    this.dao = Model;
  }
  async create(object) {
    const doc = await this.dao.create(object);
    return doc?._doc;
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
    return doc?._doc;
  }
}

module.exports = new DaoProfiles();
