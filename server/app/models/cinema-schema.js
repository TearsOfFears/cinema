const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
const CinemaHall = require("./cinema-hall-schema");
class Cinema extends Model {}

Cinema.init(
  {
    cinema_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(1000),
      unique: true,
    },
    totalCinemaHalls: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    location: DataTypes.JSON({
      country: { type: DataTypes.STRING(1000) },
      state: DataTypes.STRING(30),
      city: DataTypes.STRING(30),
      allowNull: false,
      require: true,
    }),
    state: {
      type: DataTypes.STRING(10),
      validate: { isIn: [["active", "passive", "closed"]] },
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "cinema",
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

Cinema.hasMany(CinemaHall, {
  foreignKey: "cinema_hall_id",
  onDelete: "CASCADE",
});
CinemaHall.belongsTo(Cinema, {
  foreignKey: "cinema_id",
  onDelete: "CASCADE",
});
module.exports = Cinema;
