const ProfilesDao = require("../models/profiles-schema");

class DaoProfiles {
  constructor() {
    this.dao = ProfilesDao;
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
        profile_id: id,
      },
    });
  }
  async get(id) {
    const doc = await this.dao.findOne({
      where: {
        profile_id: id,
      },
    });
    if (!doc) return null;
    return doc?.dataValues;
  }
  async getProfilesByName(dtoIn) {
    const doc = await this.dao.findOne({
      where: dtoIn,
    });
    if (!doc) return null;
    return doc?.dataValues.profile_id;
  }
  async getProfilesByIds({ profilesArrayId }) {
    const dtoOut = await this.dao.findAll({
      where: {
        profile_id: profilesArrayId,
      },
      attributes: [`profile_id`],
      raw: true,
    });
    if (!dtoOut) return null;
    return dtoOut;
  }
  async update(dtoIn) {
    const { id, name, description } = dtoIn;
    const doc = await this.dao.update(
      { name, description },
      {
        where: { profile_id: id },
        returning: true,
        raw: true,
      }
    );
    if (!doc) return null;
    return doc[1].dataValues;
  }
}

module.exports = new DaoProfiles();
