const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/userModel");
const userControl = require("../controllers/userController");
router.use(express.json());

router.get("/", async (req, res) => {
  const populate = function (user) {
    return user.populate("expenses groups", " -users -__v");
  };
  try {
    /* 
    collection.find({},{}) parameters
    - first bracket = query selection
    - second bracket = field inclusion(1)/exclusion(0)
      - can NOT mix inclusion with exclusion, all values must be 1 or 0
      - either choose all values to include or all vaulues to exclude
    _password: 0 <- add to second brackets to remove password in json
    */
    const users = await User.find({}, { _password: 0, __v: 0 });
    for (const user of users) {
      await populate(user);
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getUser, (req, res) => {
  res.send(req.params.id);
  // res.send(res.user.name);
});
router.post("/login", userControl.login);
router.patch("/addFriend", userControl.addFriend);
router.post("/", async (req, res) => {
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser) {
    return res.status(401).json({ error: "invalid email" });
  }
  bcrypt.hash(req.body._password, 10).then(async(hash) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      _password: hash,
    });
    try {
      await user.save();
      user._password='hidden'
      var session = req.session;
      session.userId = user.id;
      res.status(201).json({ user });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
    // user
    //   .save()
    //   .then(() => {
    //     res.status(201).json({
    //       message: "User added successfully!",
    //     });
    //   })
    //   .catch((error) => {
    //     res.status(500).json({
    //       error: error.message,
    //     });
    //   });
  });
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
