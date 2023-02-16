const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
const Profiles = require("./profiles-schema");
class User extends Model {
  static associate({ Post }) {
    // this.hasMany(Post, { foreignKey: "userId", as: "posts" });
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

const UserSchema = User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(30),
      unique: true,
      require: true,
    },
    passwordHash: {
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
          key: "id",
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
    tableName: "users",
    timestamps: true,
    createdAt: true,
    updatedAt: true,
  }
);

module.exports = UserSchema;

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
