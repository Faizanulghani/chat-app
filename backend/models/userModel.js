let mongoose = require("mongoose");

let userSchema = new mongoose.Schema(
  {
    fullname: { required: true, type: String },
    username: { required: true, type: String, unique: true },
    password: { required: true, type: String, minLength: 6 },
    email: { required: true, type: String },
    gender: { required: true, type: String, enum: ["male", "female"] },
    profilepic: { required: true, type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
