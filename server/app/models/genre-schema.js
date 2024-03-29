const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
class Genre extends Model {
  static associate({ Post }) {
    // this.hasMany(Post, { foreignKey: "userId", as: "posts" });
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

const GenreSchema = Genre.init(
  {
    genre_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING(40),
      unique: true,
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
    tableName: "genre",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = GenreSchema;
