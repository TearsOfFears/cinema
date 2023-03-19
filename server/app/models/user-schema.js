const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
const Profiles = require("./profiles-schema");
class User extends Model {}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      require: true,
    },
    password_hash: {
      type: DataTypes.STRING(100),
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    profiles: {
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
      type: DataTypes.STRING(255),
      validate: { isIn: [["active", "passive", "closed"]] },
      defaultValue: "active",
    },
  },
  {
    sequelize,
    tableName: "user",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = User;
