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
    description: {
      type: DataTypes.STRING(3000),
    },
    duration: {
      type: DataTypes.STRING(50),
    },
    language: {
      type: DataTypes.ARRAY({
        type: DataTypes.STRING(10),
      }),
    },
    releaseDate: {
      type: DataTypes.DATE(),
    },
    country: {
      type: DataTypes.STRING(10),
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
