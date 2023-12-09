import { Request, Response, NextFunction } from "express";
// import Transaction from ;
const express = require("express");
const Transaction = require("../models/transaction.js");
const router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getTransaction, (req: Request, res: Response) => {
  res.json(res.locals.transaction);
});

router.post("/", async (req: Request, res: Response) => {
  const { title, creator, totalAmount, payments } = req.body;

  const transaction = new Transaction({
    title,
    creator,
    totalAmount,
    payments,
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", (req: Request, res: Response) => {
  // Implement patch logic
});

router.delete("/:id", (req: Request, res: Response) => {
  // Implement delete logic
});

async function getTransaction(req: Request, res: Response, next: NextFunction) {
  let transaction;
  try {
    transaction = await Transaction.findById(req.params.id);
    if (transaction === null) {
      return res.status(400).json({ message: "No such transaction" });
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
  res.locals.transaction = transaction;
  next();
}

module.exports = router;
