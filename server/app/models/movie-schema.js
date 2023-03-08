const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
class Movie extends Model {}
Movie.init(
  {
    movie_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(1000),
      unique: true,
      require: true,
    },
    plotLong: {
      type: DataTypes.STRING(3000),
    },
    plotShort: {
      type: DataTypes.STRING(30000),
    },
    duration: {
      type: DataTypes.INTEGER(5),
    },
    language: {
      type: DataTypes.ARRAY({
        type: DataTypes.STRING(10),
      }),
    },
    year: {
      type: DataTypes.DATE(),
    },
    poster: {
      type: DataTypes.STRING(),
    },
    country: {
      type: DataTypes.ARRAY({
        type: DataTypes.STRING(10),
      }),
    },
    genre: {
      type: DataTypes.ARRAY({
        type: DataTypes.STRING(20),
      }),
    },
    state: {
      type: DataTypes.STRING(10),
      validate: { isIn: [["active", "passive", "closed"]] },
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "movie",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = Movie;
