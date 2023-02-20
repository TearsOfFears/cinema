const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
const City = require("./city-schema");
const CinemaHall = require("./cinema-hall-schema");
class Cinema extends Model {
  static associate({ Post }) {
    // this.hasMany(Post, { foreignKey: "userId", as: "posts" });
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

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
    },
    totalCinemaHalls: {
      type: DataTypes.STRING(20),
    },
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
Cinema.belongsTo(City, {
  foreignKey: { name: "city_id", field: "city_id" },
  onDelete: "CASCADE",
});

Cinema.hasMany(CinemaHall, {
  foreignKey: "cinema_hall_id",
  onDelete: "CASCADE",
});
module.exports = Cinema;
