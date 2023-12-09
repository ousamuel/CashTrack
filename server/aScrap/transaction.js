"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require("mongoose");
var mongoose_1 = require("mongoose");
var PaymentSchema = new mongoose_1.Schema({
    user: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
});
var TransactionSchema = new mongoose_1.Schema({
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
var Transaction = (0, mongoose_1.model)("Transaction", TransactionSchema);
exports.default = Transaction;
