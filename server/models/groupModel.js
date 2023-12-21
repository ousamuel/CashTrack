const mongoose = require("mongoose");

// const PaymentSchema = new mongoose.Schema({
//   recipient: {
//     type: String,
//     required: true,
//   },
//   amountToPay: {
//     type: Number,
//     required: true,
//   },
// });

// const MemberSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//   },
//   payments: [PaymentSchema],
// });

const GroupSchema = new mongoose.Schema({
  groupName: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: new Date(),
    // required: true,
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
      unique: true,
    },
  ],
});

module.exports = mongoose.model("Group", GroupSchema);
