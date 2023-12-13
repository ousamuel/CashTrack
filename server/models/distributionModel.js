const mongoose = require("mongoose");

const DistributionSchema = new mongoose.Schema({
  lendingUser: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  // recipient: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "User",
  // },
  amount: {
    type: Number,
    required: true,
  },
  // expense: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "Expense",
  // },
});

module.exports = mongoose.model("Distribution", DistributionSchema);
