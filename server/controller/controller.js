var User = require("../models/user");

exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
  });

  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({ message: error.message || "error" });
    });
};

exports.find = (req, res) => {};

exports.update = (req, res) => {};

exports.delete = (req, res) => {};

