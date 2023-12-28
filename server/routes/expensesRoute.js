const express = require("express");
const Expense = require("../models/expenseModel");
const User = require("../models/userModel");
const Group = require("../models/groupModel");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const populate = function (expense) {
    return expense.populate([
      {
        path: "creator",
        select: "_id name email profilePicture",
      },
      {
        path: "group",
        select: "-_id -expenses",
      },
      {
        path: "users",
        select: "_id name email profilePicture",
      },
    ]);
  };

  try {
    const expenses = await Expense.find({}, { __v: 0 });
    for (const expense of expenses) {
      await populate(expense);
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/groupId/:groupId", async (req, res) => {
  const populate = function (expense) {
    return expense.populate([
      {
        path: "users",
        select: "_id name email profilePicture",
      },
      {
        path: "group",
        select: "groupName",
      },
      {
        path: "distributions",
        populate: { path: "lendingUser", select: "name email" },
      },
      {
        path: "payments",
        populate: { path: "sender", select: "name email" },
      },
      {
        path: "creator",
        select: "_id name email profilePicture",
      },
    ]);
  };

  try {
    const expenses = await Expense.find(
      { group: req.params.groupId },
      { __v: 0 }
    );
    for (const expense of expenses) {
      await populate(expense);
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id });
    res.status(200).json(expense);
  } catch (err) {
    console.error(err);
  }
  // res.json(res.locals.expense);
});
router.patch("/myDistribution/:expenseId", async (req, res) => {
  const { payment, sender } = req.body;

  try {
    const expense = await Expense.findOne({ _id: req.params.expenseId });
    await expense.populate({
      path: "distributions",
      populate: {
        path: "lendingUser",
        select: "name email",
      },
    });
    const dis = expense.distributions.find((dis) => dis.lendingUser._id == sender);
    dis.payment += payment;
    await expense.save();
    res.status(200).json(dis);
  } catch (err) {
    console.error(err);
  }
});
router.get("/myDistribution/:expenseId", async (req, res) => {
  const { sender } = req.body;

  try {
    const expense = await Expense.findOne({ _id: req.params.expenseId });
    await expense.populate({
      path: "distributions",
      populate: {
        path: "lendingUser",
        select: "name email",
      },
    });
    const dis = expense.distributions.find(
      (dis) => dis.lendingUser._id == sender
    );
    res.status(200).json(dis);
  } catch (err) {
    console.error(err);
  }
});
router.post("/", async (req, res) => {
  const {
    title,
    creator,
    totalAmount,
    group,
    imageSrc,
    distributions,
    userIds,
  } = req.body;

  const expense = new Expense({
    title,
    creator,
    totalAmount,
    group,
    imageSrc,
    distributions,
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
    await User.findByIdAndUpdate(
      creator,
      { $push: { expenses: expense._id } },
      { new: true, useFindAndModify: false }
    );

    for (const userId of userIds) {
      await addExpenseToUser(userId, expense);
    }
    await addExpenseToGroup(group, expense);
    expense.save();
    await expense.populate([
      {
        path: "users",
        select: "_id name email profilePicture",
      },
      {
        path: "group",
        select: "groupName",
      },
      {
        path: "distributions",
        populate: { path: "lendingUser", select: "name email" },
      },
      {
        path: "payments",
        populate: { path: "sender", select: "name email" },
      },
      {
        path: "creator",
        select: "_id name email profilePicture",
      },
    ]);
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/payment/:id/", async (req, res) => {
  const { sender, title, amount } = req.body;
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          payments: {
            sender,
            title,
            amount,
          },
        },
      },
      { new: true, useFindAndModify: false }
    );
    res.status(201).json(expense);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Expense deleted" });
  } catch (err) {
    console.log(err);
  }
  // Implement delete logic
});

// async function getExpenseByUser(req, res, next) {
//   let expense;
//   try {
//     const expenses = await Expense.find({ userIds: req.body.userid });
//     if (expense === null) {
//       return res.status(400).json({ message: "No such expense" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: error.message });
//   }
//   res.expense = expense;
//   next();
// }

module.exports = router;

/*
all (my) expenses: fetch by filtering through userId
^^^^ find a way to do relational mapping so that user.expenses
can fetch all without filtering ^^^^
https://medium.com/@brandon.lau86/one-to-many-relationships-with-mongodb-and-mongoose-in-node-express-d5c9d23d93c2



group expenses: fetch by filtering through groupId



*/
