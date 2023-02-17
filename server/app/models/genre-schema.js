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
    tableName: "genres",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = GenreSchema;

// const UserSchema = new mongoose.Schema(
//   {
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       index: true,
//     },
//     username: {
//       type: String,
//       index: true,
//     },
//     passwordHash: {
//       type: String,
//       required: true,
//     },
//     google: {
//       id: String,
//       token: String,
//       email: String,
//       name: String,
//     },
//     likesPostArray: {
//       type: Array,
//       default: [],
//     },
//     disLikesPostArray: {
//       type: Array,
//       default: [],
//     },
//     isActivated: {
//       type: Boolean,
//       default: false,
//     },
//     profiles: {
//       type: Array,
//       default: [],
//     },
//     state: {
//       type: String,
//       default: "active",
//     },
//     typeRegist: String,
//     activationLink: String,
//     avatar: {
//       type: Object,
//       default: {},
//     },
//     status: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// UserSchema.index({ userName: 1, email: -1 }, { unique: true });
// module.exports = mongoose.model("user", UserSchema);
