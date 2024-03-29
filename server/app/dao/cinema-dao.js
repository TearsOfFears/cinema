const CinemaSchema = require("../models/cinema-schema");

class CinemaDao {
  constructor() {
    this.dao = CinemaSchema;
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
      where: { state: dtoIn.state },
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
        cinema_id: id,
      },
    });
  }
  async get(id) {
    const doc = await this.dao.findOne({
      where: {
        cinema_id: id,
      },
    });
    if (!doc) return null;
    return doc.dataValues;
  }
  async update(dtoIn) {
    const { id, username } = dtoIn;
    const doc = await this.dao.update(
      { username },
      { where: { cinema_id: id }, returning: true, plain: true }
    );
    if (!doc) return null;
    return doc[1].dataValues;
  }
  async setState(dtoIn) {
    const { id, state } = dtoIn;
    console.log(id, state);
    const doc = await this.dao.update(
      { state },
      { where: { cinema_id: id }, returning: true, plain: true }
    );
    if (!doc) return null;
    return doc[1].dataValues;
  }
}

module.exports = new CinemaDao();
