const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    username: {
      type: String,
      index: true,
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
    profiles: {
      type: Array,
      default: [],
    },
    state: {
      type: String,
      default: "active",
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

UserSchema.index({ userName: 1, email: -1 }, { unique: true });
module.exports = mongoose.model("user", UserSchema);
