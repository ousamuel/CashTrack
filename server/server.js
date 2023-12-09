require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const io = require("socket.io")(process.env.SOCKET_PORT);
const app = express();
const mongoose = require("mongoose");
const router = express.Router();
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));
const min = 1000 * 60
const hour = min * 60
const day = hour * 24
// session parameters with time limit
// temporary secret key
app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: hour },
    resave: false,
  })
);
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);
app.use(express.json());
app.use(cookieParser());

// stand-alone route for destroying session
app.get("/logout", (req, res) => {
  req.session.destroy();
});

// ALL ROUTES - - - - - -
const usersRouter = require("./routes/usersRoute");
app.use("/users", usersRouter);

const expensesRouter = require("./routes/expensesRoute");
app.use("/expenses", expensesRouter);

const groupsRouter = require("./routes/groupsRoute");
app.use("/groups", groupsRouter);

// - - - - - - -
app.use("/", router);

const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("HELLO FROM new!! EXPRESS");
});
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
/*
Models
- individual user
  - email
  - name
  - money owed to others
  - money owed to self
   

- transactions
  - type: 1-1 or group
  - category
  - involved users
  - date
  - total amount
  - price division
- 1-1
  - user to user 

- groups
  - multiple users

*/
