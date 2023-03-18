const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
const CinemaHall = require("./cinema-hall-schema");
const Movie = require("./movie-schema");
class Show extends Model {}

Show.init(
  {
    show_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE(),
      require: true,
    },
    startTime: {
      type: DataTypes.TIME(),
      require: true,
    },
    endTime: {
      type: DataTypes.TIME(),
      require: true,
    },
    // movie_id: {
    //   type: DataTypes.ARRAY({
    //     type: DataTypes.UUID,
    //     references: {
    //       model: Profiles,
    //       key: "profiles_id",
    //     },
    //     allowNull: false,
    //   }),
    // },
    // cinema_hall_id: {
    //   type: DataTypes.ARRAY({
    //     type: DataTypes.UUID,
    //     references: {
    //       model: Profiles,
    //       key: "profiles_id",
    //     },
    //     allowNull: false,
    //   }),
    // },
    state: {
      type: DataTypes.STRING(10),
      validate: { isIn: [["active", "passive", "closed"]] },
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "show",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);
CinemaHall.hasMany(Show, {
  foreignKey: "cinema_hall_id",
  onDelete: "CASCADE",
});
// CinemaHall.belongsTo(Show, {
//   foreignKey: "show_id",
//   onDelete: "CASCADE",
// });

Movie.hasOne(Show, {
  foreignKey: "movie_id",
  onDelete: "CASCADE",
});
module.exports = Show;
