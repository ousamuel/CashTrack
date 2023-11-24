"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const app = express();
// const express_1 = __importDefault(require("express"));
// const app = (0, express.default)();
const mongoose = require("mongoose");

const controller = require("../controller/controller")


async function connect() {
  try {
    await mongoose.connect(uri);
    console.log("mongo connected");
  } catch (error) {
    console.error(error);
  }
}
connect();

const port = 8000;
app.get("/", (req, res) => {
  res.send("HELLO FROM new!! EXPRESS");
});
app.listen(port, () => {
  console.log(`listening on ${port}`);
});