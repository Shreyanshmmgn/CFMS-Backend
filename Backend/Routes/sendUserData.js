const User = require("../Models/userModel");
const utils = require("../functionLib/util");

exports.sendUserData = (req, res, next) => {
  {
    const email = "eminem.shree@gmail.com";

    User.findOne({ email })
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((err) => next(err));
  }
};
