const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
const CinemaSeat = require("./cinema-seat-schema");
class CinemaHall extends Model {
  static associate({ Post }) {
    // this.hasMany(Post, { foreignKey: "userId", as: "posts" });
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

CinemaHall.init(
  {
    cinema_hall_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
    },
    total_seats: {
      type: DataTypes.INTEGER(),
    },
    state: {
      type: DataTypes.STRING(10),
      validate: { isIn: [["active", "passive", "closed"]] },
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "cinema_hall",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
CinemaHall.hasOne(CinemaSeat, {
  foreignKey: "cinema_seat_id",
  onDelete: "CASCADE",
});
module.exports = CinemaHall;
