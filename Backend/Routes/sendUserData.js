const User = require("../Models/userModel");

exports.sendUserData = (req, res, next) => {
  {
    const email = "eminem.shree@gmail.com";

    User.findOne({ email })
      .then((user) => {
        console.log("USer : ", user);
        res.status(200).json(user);
      })
      .catch((err) => next(err));
  }
};
