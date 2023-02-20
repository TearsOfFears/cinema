const { sequelize } = require("./../db/connect");
const { DataTypes, Model } = require("sequelize");
const Profiles = require("./profiles-schema");
class ShowSeat extends Model {
  static associate({ Post }) {
    // this.hasMany(Post, { foreignKey: "userId", as: "posts" });
  }
  toJSON() {
    return { ...this.get(), id: undefined };
  }
}

const ShowSeatSchema = ShowSeat.init(
  {
    show_seat_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    status: {
      type: DataTypes.ARRAY({
        type: DataTypes.INTEGER,
        allowNull: true,
      }),
    },
    price: { type: DataTypes.INTEGER() },
    show_id: {
      type: DataTypes.UUID,
      references: {
        model: Profiles,
        key: "show_id",
      },
      allowNull: false,
    },
    cinema_seat_id: {
      type: DataTypes.ARRAY({
        type: DataTypes.INTEGER,
        allowNull: false,
      }),
    },
    booking_id: {
      type: DataTypes.ARRAY({
        type: DataTypes.UUID,
        references: {
          model: Profiles,
          key: "booking_id",
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

module.exports = ShowSeatSchema;

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
