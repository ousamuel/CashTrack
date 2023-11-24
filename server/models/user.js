const mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  gender: String,
});

const User = mongoose.model("user", UserSchema);

module.exports = User;
