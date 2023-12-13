const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  amount: {
    type: Number,
    required: true,
  },
  expense: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Expense"
  },
});

module.exports = mongoose.model("Payment", PaymentSchema);
