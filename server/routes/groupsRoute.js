const express = require("express");
const Group = require("../models/groupModel");
const User = require("../models/userModel");
const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
  const populate = function (group) {
    return group.populate("expenses", "-users -groups -friends -__v");
  };
  try {
    const groups = await Group.find({}, { __v: 0 });
    for (const group of groups) {
      await populate(group);
    }
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/:id", async (req, res) => {
  const populate = function (group) {
    return group.populate("expenses", "-users -groups -friends -__v");
  };
  try {
    const group = await Group.findOne({ _id: req.params.id }, { __v: 0 });
    await populate(group);
    res.status(200).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { groupName, creator, userIds } = req.body;

  const group = new Group({
    groupName,
    creator,
    users: [],
    expenses: [],
  });
  const addGroupToUser = async function (userId) {
    try {
      var updatedUser = await User.findByIdAndUpdate(
        userId,
        { $push: { groups: group._id } },
        { new: true, useFindAndModify: false }
      );
      group.users.push(updatedUser._id);
      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  };
  try {
    for (const userId of userIds) {
      await addGroupToUser(userId);
    }
    group.save();
    res.status(201).json(group);
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

async function getGroup(req, res, next) {
  let group;
  try {
    group = await Group.findById(req.params.id);
    if (group === null) {
      return res.status(400).json({ message: "No such group" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.group = group;
  next();
}

module.exports = router;
