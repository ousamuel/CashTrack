// const mongoose = require("mongoose");
import { Schema, model } from "mongoose";

interface PaymentInt {
  user: string;
  amount: number;
}

interface TransactionInt {
  title: string;
  creator: string;
  transactionDate: Date;
  totalAmount: number;
  payments: PaymentInt[];
}

const PaymentSchema = new Schema<PaymentInt>({
  user: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});
const TransactionSchema = new Schema<TransactionInt>({
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
    default: Date.now,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  payments: [PaymentSchema],
});

const Transaction = model<TransactionInt>("Transaction", TransactionSchema);

export default Transaction;
