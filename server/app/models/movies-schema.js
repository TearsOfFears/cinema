const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
const Profiles = require("./profiles-schema");
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
    movie_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(1000),
      unique: true,
      require: true,
    },
    description: {
      type: DataTypes.STRING(3000),
    },
    duration: {
      type: DataTypes.STRING(50),
    },
    language: {
      type: DataTypes.ARRAY({
        type: DataTypes.STRING(3),
      }),
    },
    releaseDate: {
      type: DataTypes.DATE(),
    },
    country: {
      type: DataTypes.STRING(2),
    },
    genre: {
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
