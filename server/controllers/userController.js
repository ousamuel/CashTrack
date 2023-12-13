const User = require("../models/userModel");
const bcrypt = require("bcrypt");
exports.login = (req, res, next) => {
  // check if theres an existing session with stored user id
  // if there is, then query for user and return specified data
  if (req.session.userId) {
    User.findOne({ _id: req.session.userId }, { _password: 0, __v: 0 }).then(
      (user) => {
        user.populate("expenses groups").then((user) => {
          return res.status(200).json({
            user,
          });
        });
      }
    );
  } else {
    // if no existing session, user has to log in with credentials
    // session is created with time limit, userdata is returned to client

    // this req.email check may be redundant
    if (!req.body.email) {
      return res.status(404).json({ error: "empty input" });
    } else {
      try {
        User.findOne({ email: req.body.email }).then((user) => {
          if (!user) {
            return res.status(401).json({
              error: new Error("INVALID CREDENTIALS"),
            });
          }
          user.populate([
            { path: "expenses", select: "-__v" },
            { path: "groups", select: "-__v" },
          ]);
          try {
            bcrypt.compare(req.body._password, user._password).then((match) => {
              if (!match) {
                return res
                  .status(401)
                  .json({ error: new Error("INVALID CREDENTIALS") });
              }
              // create new session and store id
              var session = req.session;
              session.userId = user.id;
              // console.log(session);
              user._password = "hidden";
              res.status(200).json({
                user,
              });
            });
          } catch (error) {
            console.error("password error" + error.message);
          }
        });
      } catch (error) {
        console.error("user finding error" + error.message);
      }
    }
  }
};
// exports.verify = (req, res, next) => {
//   try {
//     User.findOne({ id: req.session.userId }).then((user) => {
//       if (!user) {
//         return res.status(401).json({
//           error: new Error("User not found!"),
//         });
//       }
//       user.populate("expenses groups");
//       try {
//         const userData = {
//           _id: user._id,
//           name: user.name,
//           email: user.email,
//           expenses: user.expenses,
//           groups: user.groups,
//           payments: user.payments,
//           totalOwe: user.totalOwe,
//           totalOwed: user.totalOwed,
//           profilePicture: user.profilePicture,
//           friends: user.friends,
//         };
//         console.log(session);
//         res.status(200).json(userData);
//       } catch (error) {
//         console.error("password error" + error.message);
//       }
//     });
//   } catch (error) {
//     console.error("user finding error" + error.message);
//   }
// };
