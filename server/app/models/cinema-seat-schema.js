const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
const Profiles = require("./profiles-schema");
class CinemaSeat extends Model {
  static associate({ Post }) {
    // this.hasMany(Post, { foreignKey: "userId", as: "posts" });
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

CinemaSeat.init(
  {
    cinema_seat_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    seat_number: {
      type: DataTypes.INTEGER(),
    },
    state: {
      type: DataTypes.STRING(10),
      // validate: { isIn: [["normal", "delux", "double"]] },
    },
  },
  {
    sequelize,
    tableName: "cinema_seat",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = CinemaSeat;
