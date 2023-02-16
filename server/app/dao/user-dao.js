const ModelUser = require("../models/user-schema.js");
const ModelProfiles = require("../models/profiles-schema");
const { STATES } = require("../abl/user/constants");
const { model } = require("mongoose");

class DaoUsers {
  constructor() {
    this.dao = ModelUser;
    this.daoProfiles = ModelProfiles;
  }
  async create(object) {
    const doc = await this.dao.create(object);
    const { passwordHash, ...dtoOut } = doc.dataValues;
    return dtoOut;
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
    const { passwordHash, ...dtoOut } = doc.dataValues;
    return dtoOut;
  }
  async getByEmail(object) {
    const doc = await this.dao.findOne({
      where: {
        object,
      },
    });
    if (!doc) return null;
    const { passwordHash, ...dtoOut } = doc.dataValues;
    return dtoOut;
  }
  async update(dtoIn) {
    const { id, username } = dtoIn;
    const doc = await this.dao.update(
      { username },
      { where: { id }, returning: true, plain: true }
    );
    if (!doc) return null;
    const { passwordHash, ...dtoOut } = doc[1].dataValues;
    return dtoOut;
  }
  async updateProfiles(id, dtoIn) {
    const doc = await this.dao.update(
      { profiles: dtoIn.profilesArrayId },
      { where: { id }, returning: true, plain: true }
    );
    if (!doc) return null;
    const { passwordHash, ...dtoOut } = doc[1].dataValues;
    return dtoOut;
  }
  async setState(dtoIn) {
    const { id, state } = dtoIn;
    const doc = await this.dao.update(
      { state },
      { where: { id }, returning: true, plain: true }
    );
    if (!doc) return null;
    const { passwordHash, ...dtoOut } = doc[1].dataValues;
    return dtoOut;
  }
}

module.exports = new DaoUsers();
