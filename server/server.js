require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const router = require("./router/router"); // Adjust the path
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', (error)=> console.error(error))
db.once('open', ()=>console.log('connected to db'))
// const uri =
//   "mongodb+srv://samuelou510:Ll9u8509LsGrvNvB@cluster0.w0qyptv.mongodb.net/?retryWrites=true&w=majority";
// //const uri
// app.use(express.json());
// async function connect() {
//   try {
//     await mongoose.connect(uri);
//     console.log("mongo connected");
//   } catch (error) {
//     console.error(error);
//   }
// }
// connect();

const usersRouter = require('./routes/users')
app.use('/users', usersRouter)


app.use(express.json())
app.use("/", router);






const port = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("HELLO FROM new!! EXPRESS");
});
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
