const UserDao = require("../models/user-schema.js");
const { STATES } = require("../abl/constants");

class DaoUsers {
  constructor() {
    this.dao = UserDao;
  }
  async create(object) {
    const doc = await this.dao.create(object);
    const { password_hash, ...dtoOut } = doc.dataValues;
    return dtoOut;
  }
  async list(dtoIn) {
    const offset = dtoIn.pageInfo.pageSize * dtoIn.pageInfo.pageIndex;
    const limit = dtoIn.pageInfo.pageSize;
    const objects = await this.dao.findAll({
      limit,
      offset,
      where: { state: STATES.ACTIVE },
      attributes: { exclude: ["password_hash"] },
      order: [[dtoIn.sort, dtoIn.key]],
    });
    return {
      items: objects,
      pageInfo: {
        pageTotal: objects.length,
        pageSize: dtoIn.pageInfo.pageSize,
        pageIndex: dtoIn.pageInfo.pageIndex,
      },
    };
  }
  async delete(id) {
    return await this.dao.destroy({
      where: {
        user_id: id,
      },
    });
  }
  async get(id) {
    const doc = await this.dao.findOne({
      where: {
        user_id: id,
      },
    });
    if (!doc) return null;
    const { password_hash, ...dtoOut } = doc.dataValues;
    return dtoOut;
  }
  async getByEmail(email) {
    const doc = await this.dao.findOne({
      where: {
        email,
      },
    });
    if (!doc) return null;
    return doc.dataValues;
  }
  async update(dtoIn) {
    const { id, username } = dtoIn;
    const doc = await this.dao.update(
      { username },
      { where: { user_id: id }, returning: true, plain: true }
    );
    if (!doc) return null;
    const { password_hash, ...dtoOut } = doc[1].dataValues;
    return dtoOut;
  }
  async updateProfiles(id, dtoIn) {
    const doc = await this.dao.update(
      { profiles: dtoIn.profilesArrayId },
      { where: { user_id: id }, returning: true, plain: true }
    );
    if (!doc) return null;
    const { password_hash, ...dtoOut } = doc[1].dataValues;
    return dtoOut;
  }
  async setState(dtoIn) {
    const { id, state } = dtoIn;
    const doc = await this.dao.update(
      { state },
      { where: { user_id: id }, returning: true, plain: true }
    );
    if (!doc) return null;
    const { password_hash, ...dtoOut } = doc[1].dataValues;
    return dtoOut;
  }
}

module.exports = new DaoUsers();
