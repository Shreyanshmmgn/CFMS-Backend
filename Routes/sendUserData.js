const User = require("../Models/userModel");

exports.sendUserData = (req, res, next) => {
  {
    const _id = req.cookies.uid;

    User.findOne({ _id })
      .then((user) => {
        if (user == null) {
          res.status(404).json({ user, msg: " User Not Found" });
        } else {
          res.status(200).json(user);
        }
      })
      .catch((err) => next(err));
  }
};
