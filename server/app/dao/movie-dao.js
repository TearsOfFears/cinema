const MovieSchema = require("../models/movie-schema");

class MovieDao {
  constructor() {
    this.dao = MovieSchema;
  }
  async create(object) {
    console.log(object);
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
        movie_id: id,
      },
    });
  }
  async get(id) {
    const doc = await this.dao.findOne({
      where: {
        movie_id: id,
      },
    });
    if (!doc) return null;
    return doc.dataValues;
  }
  async update(dtoIn) {
    const { id, username } = dtoIn;
    const doc = await this.dao.update(
      { username },
      { where: { movie_id: id }, returning: true, plain: true }
    );
    if (!doc) return null;
    const { password_hash, ...dtoOut } = doc[1].dataValues;
    return dtoOut;
  }
  async setState(dtoIn) {
    const { id, state } = dtoIn;
    const doc = await this.dao.update(
      { state },
      { where: { movie_id: id }, returning: true, plain: true }
    );
    if (!doc) return null;
    return doc[1].dataValues;
  }
}

module.exports = new MovieDao();
