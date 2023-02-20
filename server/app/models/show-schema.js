const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
const Profiles = require("./profiles-schema");
class Show extends Model {
  static associate({ Post }) {
    // this.hasMany(Post, { foreignKey: "userId", as: "posts" });
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

const ShowSchema = Show.init(
  {
    show_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE(),
      unique: true,
      require: true,
    },
    startTime: {
      type: DataTypes.DATE(),
      unique: true,
      require: true,
    },
    endTime: {
      type: DataTypes.DATE(),
      unique: true,
      require: true,
    },
    movie_id: {
      type: DataTypes.ARRAY({
        type: DataTypes.UUID,
        references: {
          model: Profiles,
          key: "profiles_id",
        },
        allowNull: false,
      }),
    },
    cinema_hall_id: {
      type: DataTypes.ARRAY({
        type: DataTypes.UUID,
        references: {
          model: Profiles,
          key: "profiles_id",
        },
        allowNull: false,
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
    tableName: "show",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = ShowSchema;
