const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: new Date(),
  },
  creator: {
    type: String,
    required: true,
  },
  expenses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Expense",
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Group", GroupSchema);
