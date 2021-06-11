const User = require("../Models/userModel");

exports.sendMemberData = (req, res, next) => {
  {
    const { email } = req.params;
    console.log("emailo : ", email);

    User.findOne({ email })
      .then((user) => {
        if (user == null) {
          res.status(404).json({ user, msg: " User Not Found" });
        } else {
          console.log("User Found : ", user.name);
          res.status(200).json(user);
        }
      })
      .catch((err) => next(err));
  }
};
