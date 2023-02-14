const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    google: {
      id: String,
      token: String,
      email: String,
      name: String,
    },
    likesPostArray: {
      type: Array,
      default: [],
    },
    disLikesPostArray: {
      type: Array,
      default: [],
    },
    isActivated: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: Array,
      default: [],
    },
    typeRegist: String,
    activationLink: String,
    avatar: {
      type: Object,
      default: {},
    },
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", UserSchema);
