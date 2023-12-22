require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
const { Server } = require("socket.io");
const app = express();
const crypto = require("crypto");
const mongoose = require("mongoose");
const router = express.Router();
const deploymentType = process.env.NODE_ENV;
let FRONTEND;
if (deploymentType === "production") {
  FRONTEND = process.env.PRODUCTION_FRONTEND;
} else {
  FRONTEND = process.env.FRONTEND_URL;
}
console.log(FRONTEND)
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("connected to db"));

const http = require("http");
// const io = require("socket.io")(process.env.SOCKET_PORT);
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: FRONTEND,
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   // console.log("user connected " + socket.id);

//   socket.on("send_message", (data) => {
//     socket.broadcast.emit("receive_message", data);
//   });

//   // socket.on("disconnect", () => {
//   //   console.log("user disconnected " + socket.id);
//   // });
// });

function generateRandomKey(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
}
const min = 1000 * 60;
const hour = min * 60;
const day = hour * 24;
// session parameters with time limit
// temporary secret key
app.use(
  sessions({
    secret: generateRandomKey(36),
    saveUninitialized: true,
    cookie: { maxAge: hour },
    resave: false,
  })
);
app.use(
  cors({
    credentials: true,
    origin: FRONTEND,
  })
);
app.use(express.json());
app.use(cookieParser());

// stand-alone route for destroying session
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "user logged out" });
});

// ALL ROUTES - - - - - -
const usersRouter = require("./routes/usersRoute");
app.use("/users", usersRouter);

const expensesRouter = require("./routes/expensesRoute");
app.use("/expenses", expensesRouter);

const groupsRouter = require("./routes/groupsRoute");
app.use("/groups", groupsRouter);

const paymentsRouter = require("./routes/paymentsRoute");
app.use("/payments", paymentsRouter);
// - - - - - - -
app.use("/api", router);

const port = process.env.PORT || 8000;
app.get("/api", (req, res) => {
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
