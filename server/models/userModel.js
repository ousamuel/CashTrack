const mongoose = require("mongoose");

const FriendSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "user",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  _password: {
    type: String,
    required: true,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  groups: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  payments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
  ],
  gender: {
    type: String,
  },
  totalOwe: {
    type: Number,
    default: 0,
    required: true,
  },
  totalOwed: {
    type: Number,
    default: 0,
    required: true,
  },
  profilePicture: {
    type: String,
    default: "/src",
  },

  friends: [FriendSchema],
});

module.exports = mongoose.model("User", UserSchema);
