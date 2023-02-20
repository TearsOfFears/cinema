const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
class City extends Model {}

City.init(
  {
    city_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    zip_code: {
      type: DataTypes.STRING(100),
    },
    state: {
      type: DataTypes.STRING(10),
      validate: { isIn: [["active", "passive", "closed"]] },
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "city",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = City;
