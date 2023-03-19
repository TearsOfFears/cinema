const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
const User = require("./user-schema");
const Show = require("./show-schema");
const CinemaHall = require("./cinema-hall-schema");
const Movie = require("./movie-schema");
class Booking extends Model {}

Booking.init(
  {
    booking_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(1000),
      unique: true,
    },
    seatsNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      require: true,
    },
    state: {
      type: DataTypes.STRING(10),
      validate: { isIn: [["active", "passive", "closed"]] },
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "booking",
    underscored: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

User.hasOne(Booking, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Show.hasOne(Booking, {
  foreignKey: "show_id",
  onDelete: "CASCADE",
});
module.exports = Booking;
