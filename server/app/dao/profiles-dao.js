const Model = require("../models/profiles-schema");
const { STATES } = require("../abl/user/constants");

class DaoProfiles {
  constructor() {
    this.dao = Model;
  }
  async create(object) {
    const doc = await this.dao.create(object);
    return doc?.dataValues;
  }
  async list(dtoIn) {
    const offset = dtoIn.pageInfo.pageSize * dtoIn.pageInfo.pageIndex;
    const limit = dtoIn.pageInfo.pageSize;
    const objects = await this.dao.findAll({
      limit,
      offset,
      where: { state: STATES.ACTIVE },
      order: [[dtoIn.sort, dtoIn.key]],
    });
    return {
      items: objects,
      pageInfo: {
        pageSize: dtoIn.pageInfo.pageSize,
        pageIndex: dtoIn.pageInfo.pageIndex,
      },
    };
  }
  async delete(id) {
    return await this.dao.destroy({
      where: {
        id,
      },
    });
  }
  async get(id) {
    const doc = await this.dao.findOne({
      where: {
        id,
      },
    });
    if (!doc) return null;
    return doc?.dataValues;
  }
  async getStandardProfile(dtoIn) {
    const doc = await this.dao.findOne({
      where: {
        dtoIn,
      },
    });
    if (!doc) return null;
    return doc?.dataValues.id;
  }
  async getProfilesByIds({ profilesArrayId }) {
    const dtoOut = await this.dao.findAll({
      where: {
        id: profilesArrayId,
      },
      attributes: [`id`],
      raw: true,
    });
    if (!dtoOut) return null;
    return dtoOut;
  }
  async update(dtoIn) {
    const { id, username, profiles } = dtoIn;
    const doc = await this.dao.update(dtoIn, {
      where: { id },
      returning: true,
      plain: true,
    });
    if (!doc) return null;
    return doc[1].dataValues;
  }
}

module.exports = new DaoProfiles();
