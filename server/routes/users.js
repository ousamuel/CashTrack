const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { subscribe } = require("diagnostics_channel");
const { userInfo } = require("os");
router.use(express.json());

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getUser, (req, res) => {
  res.send(req.params.id);
  // res.send(res.user.name);
});

router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.patch("/:id", (req, res) => {});
router.delete("/:id", (req, res) => {});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(400).json({ message: "no such user" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.user = user;
  next();
}
module.exports = router;
