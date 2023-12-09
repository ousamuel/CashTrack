const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const PaymentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});
const UserIdSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
});
const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  transactionDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    default: 0,
    ref: "Group"
  },
  imageSrc: {
    type: String,
  },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  payments: [PaymentSchema],
});

module.exports = mongoose.model("Expense", ExpenseSchema);

/*
1) create an expense, tagging 2 other people
2) sends post request to expense route
3) transaction is stored with involved users emaiL?, total amount, and distribution
4) for front end: requests also sent to users/:id to query for existing 
accounts with attached emails

*/
