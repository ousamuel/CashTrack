const express = require("express");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");
const Group = require("../models/groupModel");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const populate = function (expense) {
    return expense.populate("group", "-users -expenses -__v");
  };

  try {
    const expenses = await Expense.find({},{__v: 0});
    for (const expense of expenses) {
      await populate(expense);
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:groupId", async (req, res) => {
  const populate = function (expense) {
    return expense.populate("group",  "-users -expenses -__v");
  };

  try {
    const expenses = await Expense.find({group: req.params.groupId},{__v: 0});
    // for (const expense of expenses) {
    //   await populate(expense);
    // }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:groupId", getExpenseByUser, (req, res) => {
  res.json(res.locals.expense);
});

router.post("/", async (req, res) => {
  const { title, creator, totalAmount, payments, group, userIds } = req.body;

  const expense = new Expense({
    title,
    creator,
    totalAmount,
    payments,
    group,
    users: [],
  });

  const addExpenseToGroup = async function (groupId, expense) {
    try {
      var updatedGroup = await Group.findByIdAndUpdate(
        groupId,
        { $push: { expenses: expense._id } },
        { new: true, useFindAndModify: false }
      );
      return updatedGroup;
    } catch (error) {
      throw error;
    }
  };
  const addExpenseToUser = async function (userId, expense) {
    try {
      var updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { expenses: expense._id } },
        { new: true, useFindAndModify: false }
      );
      expense.users.push(updatedUser._id);
      return updatedUser;
    } catch (error) {
      throw error;
    }
  };
  try {
    for (const userId of userIds) {
      await addExpenseToUser(userId, expense);
    }
    await addExpenseToGroup(group, expense);
    expense.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", (req, res) => {
  // Implement patch logic
});

router.delete("/:id", (req, res) => {
  // Implement delete logic
});

async function getExpenseByUser(req, res, next) {
  let expense;
  try {
    const expenses = await Expense.find({ userIds: req.body.userid });
    if (expense === null) {
      return res.status(400).json({ message: "No such expense" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.expense = expense;
  next();
}

module.exports = router;

/*
all (my) expenses: fetch by filtering through userId
^^^^ find a way to do relational mapping so that user.expenses
can fetch all without filtering ^^^^
https://medium.com/@brandon.lau86/one-to-many-relationships-with-mongodb-and-mongoose-in-node-express-d5c9d23d93c2



group expenses: fetch by filtering through groupId



*/
