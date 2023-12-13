const { ObjectId } = require("mongodb");
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
  amount: {
    type: Number,
    required: true,
  },
});
const PaymentSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const ExpenseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: String,
    default: "/ss/receipt/png",
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    ref: "Group",
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
  distributions: [DistributionSchema],
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
