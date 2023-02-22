const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
class Profiles extends Model {
  static associate({ Post }) {
    // this.hasMany(Post, { foreignKey: "userId", as: "posts" });
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

const ProfileSchema = Profiles.init(
  {
    profile_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING(1000),
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "profile",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = ProfileSchema;
